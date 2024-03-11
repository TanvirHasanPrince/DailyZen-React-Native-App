import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import {
  ActivityIndicator,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  useFonts,
  Inter_400Regular,
  Inter_700Bold,
} from "@expo-google-fonts/inter";

export default function App() {
  let [fontsLoaded] = useFonts({
    "Inter-regular": Inter_400Regular,
    "Inter-bold": Inter_700Bold,
  });

  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [quote, setQuote] = useState("");
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 100);

    fetchQuote();
    setGreeting(getGreeting(currentTime.getHours()));

    return () => clearInterval(timer);
  }, []);

  function fetchQuote() {
    fetch("https://api.quotable.io/random")
      .then((response) => response.json())
      .then((data) => {
        setQuote(`"${data.content}"`);
      })
      .catch((error) => console.error("Error fetching quote:", error));
  }

  function getWeek(date) {
    const onejan = new Date(date.getFullYear(), 0, 1);
    return Math.ceil(((date - onejan) / 86400000 + onejan.getDay() + 1) / 7);
  }

  function getGreeting(hour) {
    if (hour >= 5 && hour < 12) {
      return "Good Morning";
    } else if (hour >= 12 && hour < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  }

  const dayOfYear = (date) =>
    Math.floor(
      (date - new Date(date.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24)
    );

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }

  const image = {
    uri: "https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  };

  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <View style={styles.parentView}>
        {/* Upper View Start */}
        <View style={styles.upperView}>
          <View style={{ flex: 1 }}>
            <Text style={styles.upperViewText}>
              {quote}
              <Text style={{ fontFamily: "Inter-bold", fontSize: 15 }}>
                - Tanvir Hasan Prince
              </Text>
            </Text>
          </View>
          <Pressable onPress={fetchQuote}>
            <Ionicons name="reload-circle" size={30} color="black" />
          </Pressable>
        </View>
        {/* Upper View End */}

        {/* Bottom Portion Start */}
        <View style={{ marginBottom: 36 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Feather name="sun" size={30} color="white" />
            <Text
              style={{
                fontSize: 25,
                marginLeft: 10,
                letterSpacing: 3,
                color: "white",
                fontFamily: "Inter-regular",
              }}
            >
              {greeting}
            </Text>
          </View>

          <View style={{ marginTop: 5 }}>
            <Text
              style={{
                fontFamily: "Inter-bold",
                fontSize: 60,
                color: "white",
              }}
            >
              {currentTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </View>

          <View style={{ marginTop: 10 }}>
            <Text
              style={{
                fontFamily: "Inter-bold",
                fontSize: 30,
                color: "white",
              }}
            >
              Dhaka, BD
            </Text>
          </View>

          {/* Additional Info */}
          {showAdditionalInfo && (
            <View style={styles.additionalInfoContainer}>
              <Text style={styles.additionalInfoText}>
                Date: {currentTime.toLocaleDateString()}
              </Text>
              <Text style={styles.additionalInfoText}>
                Day of the week:{" "}
                {currentTime.toLocaleDateString([], { weekday: "long" })}
              </Text>
              <Text style={styles.additionalInfoText}>
                Day of the year: {dayOfYear(currentTime)}
              </Text>
              <Text style={styles.additionalInfoText}>
                Week of the year: {getWeek(currentTime)}
              </Text>
            </View>
          )}

          {/* Button Start */}
          <Pressable
            onPress={() => setShowAdditionalInfo(!showAdditionalInfo)}
            style={{
              flexDirection: "row",
              height: 40,
              width: 115,
              backgroundColor: "white",
              borderRadius: 30,
              marginTop: 40,
              justifyContent: "space-between",
              paddingLeft: 16,
              paddingRight: 4,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "black",
                fontFamily: "Inter-bold",
                fontSize: 15,
                letterSpacing: 3,
              }}
            >
              {showAdditionalInfo ? "Hide" : "More"}
            </Text>
            <AntDesign
              name={showAdditionalInfo ? "upcircleo" : "downcircleo"}
              size={25}
              color="black"
            />
          </Pressable>

          {/* Button End */}
        </View>
        {/* Bottom Portion End */}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  parentView: {
    flex: 1,
    justifyContent: "space-between",
    marginTop: 80,
    paddingHorizontal: 26,
  },
  upperView: {
    flexDirection: "row",
  },
  upperViewText: {
    marginTop: 20,
    fontFamily: "Inter-regular",
    fontSize: 15,
    color: "black",
  },
  additionalInfoContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: "100%",
  },
  additionalInfoText: {
    fontFamily: "Inter-bold",
    fontSize: 20,
    color: "black",
    marginTop: 10,
  },
});
