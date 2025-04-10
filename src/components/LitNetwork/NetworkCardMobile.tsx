import { Box, Tabs } from '@mantine/core';

interface NetworkCardMobileProps {
  title: string;
  detail: string;
  value: string;
  activeTab: string;
  setActiveTab: (val: string) => void;
  progress: number;
  tabsRef: React.RefObject<HTMLDivElement>;
}

function NetworkCardMobile({
  title,
  value,
  activeTab,
  progress,
  setActiveTab,
}: NetworkCardMobileProps) {
  return (
    <Box
      style={{
        minWidth: '120px',
        flexShrink: 0, // don't collapse
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      onClick={() => setActiveTab(value)}
    >
      <Tabs.Tab
        className="!uppercase !font-bold"
        value={value}
        style={{
          textAlign: 'center',
          borderBottom: 'none',
          width: '100%',
          paddingBottom: '8px',
        }}
      >
        {title}
      </Tabs.Tab>

      <Box
        className="bg-pearl-500"
        style={{
          height: '4px',
          width: '100%',
          position: 'relative',
          borderRadius: '2px',
          overflow: 'hidden',
        }}
      >
        {value === activeTab && (
          <Box
            className="bg-periwinkle-500"
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              height: '100%',
              width: `${progress}%`,
              transition: 'width 0.1s ease-out',
            }}
          />
        )}
      </Box>
    </Box>
  );
}

export default NetworkCardMobile;
