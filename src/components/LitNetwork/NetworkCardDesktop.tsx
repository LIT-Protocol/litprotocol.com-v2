import { Card, Group, Text, ThemeIcon } from "@mantine/core";
import { useEffect, useState } from "react";
import styles from './lit-network.module.scss';

interface NetworkCardProps {
    value: string;
    icon: React.FC<any>;
    title: React.ReactNode;
    detail: React.ReactNode;
    isSelected: boolean;
    onClick: () => void;
  }
  
  function NetworkCardDesktop({
    icon: Icon,
    title,
    detail,
    isSelected,
    onClick,
  }: NetworkCardProps) {
    const [wasSelected, setWasSelected] = useState(isSelected);
  
    useEffect(() => {
      if (isSelected !== wasSelected) {
        setWasSelected(isSelected);
      }
    }, [isSelected]);
  
    const cardClass = `${isSelected ? styles.selected : styles.unselected} ${
      isSelected && !wasSelected ? styles.fadeIn : ''
    } ${!isSelected && wasSelected ? styles.fadeOut : ''}`;
  
    return (
      <Card
        radius="md"
        className={cardClass}
        onClick={onClick}
        style={{ cursor: 'pointer' }}
      >
        {isSelected ? (
          <>
            <Group className={styles.selected__title}>
              <ThemeIcon className={styles.iconOutline}>
                <Icon size={20} stroke={1.5} />
              </ThemeIcon>
              <Text>{title}</Text>
            </Group>
            <Text>{detail}</Text>
          </>
        ) : (
          <div className={styles.unselected__inner}>
            <Group className={styles.unselected__title}>
              <ThemeIcon className={styles.iconOutline}>
                <Icon size={20} stroke={1.5} />
              </ThemeIcon>
              <Text>{title}</Text>
            </Group>
            <Text>{detail}</Text>
          </div>
        )}
      </Card>
    );
  }

  export default NetworkCardDesktop;