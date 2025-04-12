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
        whiteSpace: 'normal', // Ensures text wrapping
        wordWrap: 'break-word',
        overflowWrap: 'break-word',
        width: '100%',
        textAlign: 'center',
        lineHeight: '1.5',
        display: 'block', // Ensures block-level rendering
        overflow: 'visible', // Ensures text doesn't get cut off
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
          textWrap: 'wrap',
          fontSize: '0.8rem', // Slightly smaller font size to help fit
          hyphens: 'auto', // Enables hyphenation
          overflow: 'visible', // Ensures text isn't cut off
          height: 'auto', // Allows height to expand with content
          minHeight: '48px', // Gives some minimum height for consistency
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
