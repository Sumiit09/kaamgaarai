import { motion } from 'framer-motion';

const Tabs = ({ tabs = [], activeTab, onChange, className = '' }) => {
  return (
    <div className={`flex gap-1 border-b border-border-light ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.value || tab}
          onClick={() => onChange(tab.value || tab)}
          className={`
            relative px-4 py-2.5 text-sm font-medium transition-colors duration-200
            ${activeTab === (tab.value || tab)
              ? 'text-text-primary'
              : 'text-text-secondary hover:text-text-primary'}
          `}
        >
          {tab.label || tab}
          {activeTab === (tab.value || tab) && (
            <motion.div
              layoutId="active-tab"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          )}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
