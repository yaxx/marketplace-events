"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TOPICS = exports.KafkaClient = void 0;
// Base types and classes
__exportStar(require("./types/base-event"), exports);
// Event schemas
__exportStar(require("./events/user-events"), exports);
__exportStar(require("./events/request-events"), exports);
__exportStar(require("./events/offer-events"), exports);
__exportStar(require("./events/chat-events"), exports);
__exportStar(require("./events/notification-events"), exports);
// Kafka client and utilities
__exportStar(require("./kafka/kafka-client"), exports);
// Constants and configurations
__exportStar(require("./constants/topics"), exports);
// Service adapters
__exportStar(require("./adapters"), exports);
// Convenience re-exports
var kafka_client_1 = require("./kafka/kafka-client");
Object.defineProperty(exports, "KafkaClient", { enumerable: true, get: function () { return kafka_client_1.MarketplaceKafkaClient; } });
var topics_1 = require("./constants/topics");
Object.defineProperty(exports, "TOPICS", { enumerable: true, get: function () { return topics_1.MARKETPLACE_TOPICS; } });
