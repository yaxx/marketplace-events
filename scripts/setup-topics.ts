#!/usr/bin/env ts-node

import { MarketplaceKafkaClient, TopicConfig } from '../src/kafka/kafka-client';
import { MARKETPLACE_TOPICS, TOPIC_CONFIGURATIONS } from '../src/constants/topics';

/**
 * Script to set up all marketplace Kafka topics
 * Usage: npx ts-node scripts/setup-topics.ts
 */

const KAFKA_CONFIG = {
  clientId: 'topic-setup-client',
  brokers: [process.env.KAFKA_BROKERS || 'localhost:9092']
};

async function setupTopics() {
  const client = new MarketplaceKafkaClient(KAFKA_CONFIG);
  
  console.log('🚀 Setting up Marketplace Kafka topics...');
  console.log(`📡 Connecting to Kafka brokers: ${KAFKA_CONFIG.brokers.join(', ')}`);
  
  try {
    // Initialize admin client
    await client.initializeAdmin();
    
    // Health check
    const isHealthy = await client.healthCheck();
    if (!isHealthy) {
      throw new Error('Kafka cluster is not healthy');
    }
    
    console.log('✅ Connected to Kafka cluster');
    
    // Get existing topics
    const existingTopics = await client.listTopics();
    console.log(`📋 Found ${existingTopics.length} existing topics`);
    
    // Prepare topic configurations
    const topicsToCreate: TopicConfig[] = Object.entries(MARKETPLACE_TOPICS)
      .map(([key, topicName]) => {
        const config = TOPIC_CONFIGURATIONS[topicName];
        return {
          topic: topicName,
          numPartitions: config.partitions,
          replicationFactor: config.replicationFactor,
          configEntries: [
            { name: 'cleanup.policy', value: 'delete' },
            { name: 'retention.ms', value: config.retentionMs.toString() },
            { name: 'segment.ms', value: config.segmentMs.toString() },
            { name: 'compression.type', value: 'gzip' },
            { name: 'max.message.bytes', value: '1048576' }, // 1MB
            { name: 'min.insync.replicas', value: '1' }
          ]
        };
      });
    
    // Filter out topics that already exist
    const newTopics = topicsToCreate.filter(
      topic => !existingTopics.includes(topic.topic)
    );
    
    if (newTopics.length === 0) {
      console.log('✅ All topics already exist');
      await client.disconnect();
      return;
    }
    
    console.log(`📝 Creating ${newTopics.length} new topics:`);
    newTopics.forEach(topic => {
      console.log(`   - ${topic.topic} (${topic.numPartitions} partitions)`);
    });
    
    // Create topics
    await client.createTopics(newTopics);
    console.log('✅ Topics created successfully');
    
    // Verify topics were created
    const updatedTopics = await client.listTopics();
    const marketplaceTopics = updatedTopics.filter(topic => 
      topic.startsWith('marketplace.')
    );
    
    console.log(`🎉 Marketplace topics summary:`);
    console.log(`   Total topics: ${marketplaceTopics.length}`);
    console.log(`   Main topics: ${Object.values(MARKETPLACE_TOPICS).filter(t => !t.includes('.dlq')).length}`);
    console.log(`   DLQ topics: ${Object.values(MARKETPLACE_TOPICS).filter(t => t.includes('.dlq')).length}`);
    
    // List all marketplace topics
    console.log('\n📋 All marketplace topics:');
    marketplaceTopics.sort().forEach(topic => {
      const isDLQ = topic.includes('.dlq');
      const icon = isDLQ ? '💀' : '📨';
      console.log(`   ${icon} ${topic}`);
    });
    
  } catch (error) {
    console.error('❌ Error setting up topics:', error);
    process.exit(1);
  } finally {
    await client.disconnect();
    console.log('\n🔌 Disconnected from Kafka');
  }
}

async function main() {
  try {
    await setupTopics();
    console.log('\n🎯 Topic setup completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('\n💥 Topic setup failed:', error);
    process.exit(1);
  }
}

// Run the script if called directly
if (require.main === module) {
  main().catch(error => {
    console.error('Unhandled error:', error);
    process.exit(1);
  });
}

export { setupTopics };