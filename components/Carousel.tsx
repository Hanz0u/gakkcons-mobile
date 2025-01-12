import React, { useRef, useState, useCallback, useEffect } from "react";
import { FlatList, View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Viewport } from "@/styles/styles";

interface CarouselProps {
  data: any[];
  renderItem: ({ item }: { item: any }) => JSX.Element;
  onNext: (itemId: any) => void;
  onPrevious: (itemId: any) => void;
}

const Carousel: React.FC<CarouselProps> = ({
  data,
  renderItem,
  onNext,
  onPrevious,
}) => {
  const flatListRef = useRef<FlatList>(null);
  const [currentItem, setCurrentItem] = useState<{ index: number; id: string }>(
    {
      index: 0,
      id: "",
    }
  );

  const handleViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: any }) => {
      if (viewableItems.length > 0) {
        const currentViewedItem = viewableItems[0].item;
        setCurrentItem({
          index: viewableItems[0].index,
          id: currentViewedItem.id,
        });
      }
    },
    []
  );

  const handleNext = () => {
    if (currentItem.index < data.length - 1) {
      const newIndex = currentItem.index + 1;
      setCurrentItem((prev) => ({
        ...prev,
        index: newIndex,
      }));
      flatListRef.current?.scrollToIndex({ index: newIndex });
    }
  };

  const handlePrevious = () => {
    if (currentItem.index > 0) {
      const newIndex = currentItem.index - 1;
      setCurrentItem((prev) => ({
        ...prev,
        index: newIndex,
      }));
      flatListRef.current?.scrollToIndex({ index: newIndex });
    }
  };

  useEffect(() => {
    if (currentItem.index > 0) {
      onNext(currentItem.id);
    } else if (currentItem.index < data.length - 1) {
      onPrevious(currentItem.id);
    }
  }, [currentItem.id, onNext, onPrevious]);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View style={{ width: Viewport.width * 0.08, paddingLeft: 10 }}>
        {currentItem.index !== 0 && (
          <TouchableOpacity
            onPress={handlePrevious}
            disabled={currentItem.index === 0}
          >
            <MaterialCommunityIcons name="less-than" size={24} color="black" />
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
        onViewableItemsChanged={handleViewableItemsChanged}
      />

      <View style={{ width: Viewport.width * 0.08, paddingRight: 10 }}>
        {currentItem.index !== data.length - 1 && (
          <TouchableOpacity
            onPress={handleNext}
            disabled={currentItem.index === data.length - 1}
          >
            <MaterialCommunityIcons
              name="greater-than"
              size={24}
              color="black"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Carousel;
