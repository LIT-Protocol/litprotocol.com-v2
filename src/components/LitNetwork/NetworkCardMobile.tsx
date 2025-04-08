import { Box, Tabs } from "@mantine/core";

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
        style={{
          height: '4px',
          width: '100%',
          backgroundColor: '#e0e0e0',
          position: 'relative',
          borderRadius: '2px',
          overflow: 'hidden',
        }}
      >
        {value === activeTab && (
          <Box
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              height: '100%',
              width: `${progress}%`,
              backgroundColor: 'var(--mantine-color-blue-6)',
              transition: 'width 0.1s ease-out',
            }}
          />
        )}
      </Box>
    </Box>
  );
}

export default NetworkCardMobile;