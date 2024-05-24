import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Calendar } from "react-native-calendars";
import Icon from "react-native-vector-icons/FontAwesome";
import { useRouter } from "expo-router";

export default function CalendarPage() {
  const [selected, setSelected] = useState("");

  const router = useRouter();

  const theme = {
    backgroundColor: "#1B2021",
    calendarBackground: "#1B2021",
    textSectionTitleColor: "#ffffff",
    dayTextColor: "#ffffff",
    selectedDayBackgroundColor: "#00adf5",
    selectedDayTextColor: "#1B2021",
    todayTextColor: "#D2F898",
    monthTextColor: "#ffffff",
    arrowColor: "#ffffff",
    textDisabledColor: "#d9e1e8",
    dotColor: "#00adf5",
    selectedDotColor: "#1B2021",
    indicatorColor: "#ffffff",
    textDayFontFamily: "monospace",
    textMonthFontFamily: "monospace",
    textDayHeaderFontFamily: "monospace",
    textDayFontWeight: "300",
    textMonthFontWeight: "bold",
    textDayHeaderFontWeight: "300",
    textDayFontSize: 16,
    textMonthFontSize: 16,
    textDayHeaderFontSize: 16,
  };

  return (
    <>
      {/* <TouchableOpacity
        onPress={() => router.push("/")}
        style={{
          position: "absolute",
          top: 80,
          left: 30,
          zIndex: 100,
          backgroundColor: "#1B2021",
        }}
      >
        <Icon name="chevron-left" size={24} color="red" />
      </TouchableOpacity> */}

      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => router.push("/")}
          style={{
            position: "absolute",
            top: 80,
            left: 30,
            zIndex: 100,
            backgroundColor: "#1B2021",
          }}
        >
          <Icon name="chevron-left" size={24} color="white" />
        </TouchableOpacity>

        <View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "600",
              color: "#E0E2DB",
              marginTop: -40,
            }}
          >
            Your Calendar
          </Text>
        </View>
        <Calendar
          onDayPress={(day) => {
            setSelected(day.dateString);
          }}
          markedDates={{
            [selected]: {
              selected: true,
              marked: true,
              selectedColor: "#D2F898",
            },
          }}
          theme={theme}
        />
        <Text style={styles.selectedDateText}>Selected Date: {selected}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 100,
    position: "relative",
    backgroundColor: "#1B2021",
    padding: 20,
    width: "100%",
    paddingTop: 200,
  },
  selectedDateText: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 18,
    color: "white",
  },
});
