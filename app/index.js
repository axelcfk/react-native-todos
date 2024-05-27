import { StatusBar } from "expo-status-bar";
import GlobalFont from "react-native-global-font";
import { TaskContext } from "../TaskContext";
import { Image, RefreshControl } from "react-native";
import { useRouter, useNavigation } from "expo-router";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useState, useEffect, useContext } from "react";
import {
  useFonts,
  Manrope_400Regular,
  Manrope_600SemiBold,
} from "@expo-google-fonts/manrope";
import {
  Swipeable,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { Link } from "expo-router";

export default function Index() {
  useEffect(() => {
    GlobalFont.applyGlobal("Roboto-Light");
  }, []);

  const { comments, tasks, addTask, deleteTask, completeTask } =
    useContext(TaskContext);

  let [fontsLoaded] = useFonts({
    Manrope_400Regular,
    Manrope_600SemiBold,
  });

  const router = useRouter();
  const navigation = useNavigation();

  const [allButton, setAllButton] = useState(true);
  const [completedButton, setCompletedButton] = useState(false);
  const [currentButton, setCurrentButton] = useState(false);
  const [addTaskButtonClicked, setAddTaskButtonClicked] = useState(false);
  // const [selectedValue, setSelectedValue] = useState("");
  const [input, setInput] = useState("");
  const [completed, setCompleted] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [allTasks, setAllTasks] = useState(tasks);
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    setAllTasks(tasks);
  }, [tasks]);

  function allButtonClicked() {
    setAllButton(true);
    setCompletedButton(false);
    setCurrentButton(false);
    setAllTasks(tasks); // visa alla tasks
  }

  function completedButtonClicked() {
    setCompletedButton(true);
    setAllButton(false);
    setCurrentButton(false);
    setAllTasks(tasks.filter((task) => task.completed)); // visa bara avslutade tasks om completebutton är klickad
  }

  function currentButtonClicked() {
    setCurrentButton(true);
    setAllButton(false);
    setCompletedButton(false);
    setAllTasks(tasks.filter((task) => !task.completed)); // visa bara oavslutade tasks om currentbutton är klickad
  }

  const getCurrentDate = () => {
    const date = new Date();
    return date.toLocaleDateString("sv-SE", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  function handleAddTaskButton() {
    setAddTaskButtonClicked(!addTaskButtonClicked);
  }

  function handleAddTaskInput(text) {
    setInput(text);
  }

  const handleAddTask = () => {
    const newTask = {
      id: allTasks.length + 1,
      text: input,
      completed: false,
      description: "",
    };

    addTask(newTask);
    setInput("");
    setAddTaskButtonClicked(false);
  };

  const renderRightActions = (id) => (
    <TouchableOpacity
      style={{ justifyContent: "center", alignItems: "center" }}
      onPress={() => deleteTask(id)}
    >
      <View
        style={{
          height: 140,
          width: 140,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={styles.deleteButtonText}>
          <Icon name="trash" size={28} color="#FF6663" />
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => {
    const taskComments = comments[item.id] || [];
    return (
      <Swipeable renderRightActions={() => renderRightActions(item.id)}>
        <Link
          href={{
            pathname: `/task/${item.id}`,
            params: {
              text: item.text,
              completed: item.completed,
              description: item.description,
            },
          }}
          asChild
        >
          <TouchableOpacity
            style={item.completed ? styles.taskview2 : styles.taskview1}
            activeOpacity={0.8}
          >
            <View>
              <Text style={{ fontSize: 32, fontWeight: "600" }}>
                {item.text.toUpperCase()}
              </Text>
              <Text style={{ fontWeight: "600", marginTop: 10 }}>
                {comments[item.id] ? comments[item.id].length : 0} Comments
              </Text>
            </View>
            <Icon
              onPress={() => completeTask(item.id)}
              style={{ position: "absolute", top: 10, right: 10 }}
              name={item.completed ? "circle" : "circle-o"}
              size={40}
              color="#1B2021"
            />
          </TouchableOpacity>
        </Link>
      </Swipeable>
    );
  };

  const onRefresh = () => {
    setRefreshing(true);
    // Add your refresh logic here (e.g., fetch new data)
    setTimeout(() => {
      setRefreshing(false);
    }, 2000); // Simulating network request
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View
          style={{
            justifyContent: "flex-end",
            flexDirection: "row",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <TouchableOpacity onPress={() => router.push("/signup/signupPage")}>
            <Icon name="user-circle" size={28} color="#E0E2DB" />
          </TouchableOpacity>
          <Icon
            style={{ marginLeft: 14 }}
            name="bars"
            size={28}
            color="#E0E2DB"
          />
        </View>
        <TouchableOpacity
          onPress={() => router.push("/calendar/calendarPage")}
          style={{ position: "absolute", top: 80, left: 30 }}
        >
          <Icon name="calendar" size={28} color="#E0E2DB" style={styles.icon} />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
            marginTop: 20,
          }}
        >
          <View>
            <Text style={styles.heading1}>Your Daily Todos</Text>
            <Text style={{ color: "#E0E2DB", marginTop: 5, fontWeight: "600" }}>
              {getCurrentDate()}
            </Text>
          </View>

          <View style={styles.addtaskcontainer}>
            <TouchableOpacity
              onPress={handleAddTaskButton}
              style={styles.addtaskwrap}
            >
              <Text style={styles.addtasktext}>Add</Text>
              <Icon name="plus" size={16} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.buttonwrapper}>
          {allButton ? (
            <TouchableOpacity
              onPress={allButtonClicked}
              style={styles.buttoncontainer1}
            >
              <Text style={styles.button1}>All</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={allButtonClicked}
              style={styles.buttoncontainer2}
            >
              <Text style={styles.button2}>All</Text>
            </TouchableOpacity>
          )}

          {completedButton ? (
            <TouchableOpacity
              onPress={completedButtonClicked}
              style={styles.buttoncontainer1}
            >
              <Text style={styles.button1}>Done</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={completedButtonClicked}
              style={styles.buttoncontainer2}
            >
              <Text style={styles.button2}>Done</Text>
            </TouchableOpacity>
          )}
          {currentButton ? (
            <TouchableOpacity
              onPress={currentButtonClicked}
              style={styles.buttoncontainer1}
            >
              <Text style={styles.button1}>In progress</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={currentButtonClicked}
              style={styles.buttoncontainer2}
            >
              <Text style={styles.button2}>In progress</Text>
            </TouchableOpacity>
          )}
        </View>

        {addTaskButtonClicked && (
          <View style={styles.addTaskWrapper}>
            <View style={styles.selectwrap}>
              <View style={styles.selectview}>
                <TouchableOpacity
                  style={{ position: "absolute", top: 16, right: 16 }}
                  onPress={handleAddTaskButton}
                >
                  <Icon name="close" size={28} color="black" />
                </TouchableOpacity>
                <Text style={styles.heading2}>Add a Task</Text>
                <TextInput
                  value={input}
                  onChangeText={handleAddTaskInput}
                  style={styles.textInput}
                  placeholder="ADD A TASK"
                />

                <TouchableOpacity
                  onPress={handleAddTask}
                  style={styles.addtask}
                >
                  <Text style={styles.addtasktext}>Add Task</Text>
                  <Icon name="plus" size={16} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {/* <Image
          source={require("../assets/images/dalle.webp")}
          style={{ height: 100, width: 100 }}
        /> */}

        <FlatList
          data={allTasks}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 20 }}
          refreshing={refreshing}
          onRefresh={onRefresh}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#ffffff"]} // For Android
              tintColor="#ffffff" // For iOS
            />
          }
        />

        <StatusBar style="auto" />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 100,
    position: "relative",
    backgroundColor: "#1B2021",
    padding: 20,
    paddingTop: 60,
    width: "100%",
  },
  heading1: {
    fontSize: 20,
    fontWeight: "600",
    color: "#E0E2DB",
  },
  heading2: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1B2021",
    marginVertical: 20,
  },
  addtaskcontainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 18,
  },
  addtaskwrap: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 0.5,
    height: 40,
    width: 100,
    borderRadius: 50,
    backgroundColor: "#E0E2DB",
    paddingHorizontal: 10,
  },
  addtasktext: {
    color: "#1B2021",
    marginRight: 5,
    fontWeight: "600",
  },
  addTaskWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    alignItems: "center",
    justifyContent: "center",
  },
  selectwrap: {
    zIndex: 1000,
    backgroundColor: "#E0E2DB",
    height: 400,
    marginTop: -30,
    position: "absolute",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
  },
  selectview: {
    position: "absolute",
    borderWidth: 1,
    borderColor: "black",
    borderStyle: "solid",
    zIndex: 1000,
    backgroundColor: "#E0E2DB",
    height: "100%",
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    borderRadius: 20,
  },
  textInput: {
    height: 80,
    width: "100%",
    borderRadius: 5,
    borderWidth: 1,
    color: "#1B2021",
    borderStyle: "solid",
    paddingHorizontal: 10,
    marginTop: 20,
    fontSize: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  addtask: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 0.5,
    height: 40,
    marginTop: 20,
    borderRadius: 50,
    backgroundColor: "#E7E247",
    paddingHorizontal: 10,
  },
  buttonwrapper: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 30,
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttoncontainer1: {
    height: 40,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    borderWidth: 1,
    color: "#1B2021",
    backgroundColor: "#D2F898",
  },
  buttoncontainer2: {
    height: 40,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "white",
    borderStyle: "solid",
  },
  button1: {
    alignItems: "center",
    justifyContent: "center",
    color: "#1B2021",
    fontWeight: "600",
  },
  button2: {
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontWeight: "600",
  },
  taskview1: {
    zIndex: 100,
    backgroundColor: "#E0E2DB",
    marginVertical: 8,
    height: 140,
    borderRadius: 10,
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  taskview2: {
    zIndex: 100,
    backgroundColor: "#D2F898",
    marginVertical: 8,
    height: 140,
    borderRadius: 10,
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
});
