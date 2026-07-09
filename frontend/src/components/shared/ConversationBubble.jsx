import { motion } from 'framer-motion';

const SentBubble = ({ text, time, index = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className="flex justify-end"
  >
    <div className="max-w-[75%]">
      <div className="bg-primary text-white rounded-2xl rounded-br-md px-4 py-2.5 text-sm">
        {text}
      </div>
      <p className="text-2xs text-text-tertiary mt-1 text-right">{time}</p>
    </div>
  </motion.div>
);

const ReceivedBubble = ({ text, time, index = 0, sender = 'AI' }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className="flex justify-start"
  >
    <div className="max-w-[75%]">
      <div className="bg-surface border border-border-light text-text-primary rounded-2xl rounded-bl-md px-4 py-2.5 text-sm">
        {text}
      </div>
      <p className="text-2xs text-text-tertiary mt-1">{sender} · {time}</p>
    </div>
  </motion.div>
);

const TypingIndicator = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex justify-start"
  >
    <div className="bg-surface border border-border-light rounded-2xl rounded-bl-md px-4 py-3">
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
            className="w-2 h-2 bg-text-tertiary rounded-full"
          />
        ))}
      </div>
    </div>
  </motion.div>
);

const ConversationBubble = ({ message, index }) => {
  if (message.sender === 'customer') {
    return <ReceivedBubble text={message.text} time={message.time} index={index} sender="Customer" />;
  }
  return <SentBubble text={message.text} time={message.time} index={index} />;
};

export { SentBubble, ReceivedBubble, TypingIndicator };
export default ConversationBubble;
