import { TaskContext } from "../../TaskContext";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome";

import { useState, useEffect, useContext } from "react";

export default function TaskCard() {
  const [completedClicked, setCompletedClicked] = useState(false);
  const [deleteButtonCLicked, setDeleteButtonCLicked] = useState(false);

  function handleCompleteClick() {
    setCompletedClicked(!completedClicked);
    completeTask(task.id);
  }

  const { id, text, completed, description } = useLocalSearchParams();

  const {
    tasks,
    comments,
    addTask,
    updateTask,
    deleteTask,
    completeTask,
    addComment,
  } = useContext(TaskContext);

  const router = useRouter();

  const task = tasks.find((t) => t.id === parseInt(id));
  const [descriptionText, setDescriptionText] = useState(task.description);

  useEffect(() => {
    setDescriptionText(task.description);
  }, [task.description]);

  function handleUpdateTask() {
    updateTask({ ...task, description: descriptionText });
    // router.back();
  }
  const [taskDetails, setTaskDetails] = useState({
    id,
    text,
    completed,
    description,
  });

  useEffect(() => {
    // Update taskDetails state when navigation parameters change
    setTaskDetails({ id, text, completed, description });
  }, [id, text, completed, description]);

  // function handleUpdateTask() {
  //   onUpdateTask(taskDetails);
  //   router.back();
  // }
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <View
          style={{
            // backgroundColor: "white",
            // height: 50,
            justifyContent: "flex-end",
            flexDirection: "row",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Icon name="user-circle" size={28} color="white" />
          <Icon
            style={{ marginLeft: 14 }}
            name="bars"
            size={28}
            color="white"
          />
        </View>

        <TouchableOpacity
          onPress={() => router.back()}
          style={{ position: "absolute", top: 80, left: 30 }}
        >
          <Icon name="chevron-left" size={24} color="white" />
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
            <Text style={styles.heading1}>{task.text.toUpperCase()}</Text>
            {taskDetails.completed == "true" ? (
              <Text style={{ color: "white", marginTop: 5, fontWeight: "600" }}>
                Marked as completed
              </Text>
            ) : (
              <Text style={{ color: "white", marginTop: 5, fontWeight: "600" }}>
                Not completed
              </Text>
            )}
          </View>

          <View style={styles.addtaskcontainer}>
            <TouchableOpacity
              onPress={handleCompleteClick}
              style={styles.addtaskwrap}
            >
              <Text style={styles.addtasktext}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            backgroundColor:
              taskDetails.completed == "true" || completedClicked
                ? "#D2F898"
                : "#E0E2DB",
            height: 500,

            borderRadius: 5,
            padding: 14,
          }}
        >
          <Text style={styles.heading2}>Add a Comment</Text>
          <TextInput
            style={{
              height: 100,
              backgroundColor: "white",
              borderRadius: 5,
              padding: 10,
            }}
            onChangeText={setDescriptionText}
            value={descriptionText}
            placeholder="ADD A COMMENT"
          />
          <TouchableOpacity
            style={styles.addtask}
            onPress={() => addComment(task.id, descriptionText)}
          >
            <Text style={styles.addtasktext}>Add Comment</Text>
            <Icon name="plus" size={16} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => deleteTask(task.id)}
            style={{ top: 25, right: 25, position: "absolute" }}
          >
            <Icon name="trash" size={28} color="#FF6663" />
          </TouchableOpacity>
          {/* {deleteButtonCLicked && (
            <View>
              <Text>delete button clicked</Text>
            </View>
          )} */}

          <ScrollView>
            <View style={{}}>
              {comments[task.id] &&
                comments[task.id].map((comment, index) => (
                  <View
                    style={{
                      minHeight: 50,
                      backgroundColor: "white",
                      marginVertical: 10,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "start",
                      paddingLeft: 80,
                      paddingRight: 20,
                      paddingVertical: 20,
                      borderRadius: 50,
                    }}
                  >
                    <Icon
                      style={{ left: 20, position: "absolute" }}
                      name="comment-o"
                      size={24}
                      color="black"
                    />

                    <Text
                      style={{ flexWrap: "wrap", fontWeight: "600" }}
                      key={index}
                    >
                      {comment}
                    </Text>
                  </View>
                ))}
            </View>
          </ScrollView>

          {/* <Text style={styles.heading2}>Activity</Text>
          <TextInput
            style={{
              height: 50,
              backgroundColor: "white",
              borderRadius: 5,
              padding: 10,
              // borderWidth: 1,
              // color: "#1B2021",
            }}
            placeholder="ADD A COMMENT"
          /> */}
          {/* <Text>Task Details</Text>
          <Text>ID: {task.id}</Text>
          <Text>Text: {task.text}</Text>
          <Text>Completed: {task.completed}</Text> */}
        </View>
        <StatusBar style="auto" />
      </View>
    </View>
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
    // marginHorizontal: 10,
    width: "100%",
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
  taskview1: {
    zIndex: 100,
    backgroundColor: "#DABFFF",
    marginVertical: 8,
    height: 140,
    borderRadius: 10,
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    zIndex: 200,
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
    zIndex: 200,
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

    // backgroundColor: "#3A0CA3",
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

  heading2: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1B2021",
    // backgroundColor: "blue",
    width: "100%",
    marginVertical: 20,
  },

  heading1: {
    fontSize: 30,
    fontWeight: "600",
    color: "white",
  },

  addtaskcontainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 18,
  },

  textInput: {
    height: 40,
    width: "100%",

    // backgroundColor: "#F4F4F8",
    borderRadius: 5,
    borderWidth: 1,
    color: "#1B2021",
    borderStyle: "solid",
    paddingHorizontal: 10,
    marginTop: 20,
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
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
  addtasktext: {
    color: "#1B2021",
    marginRight: 5,
    fontWeight: "600",
  },
  selectview: {
    position: "absolute",

    zIndex: 1000,
    backgroundColor: "#F4F4F8",
    height: "100%",
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    borderRadius: 20,
  },

  selectwrap: {
    zIndex: 1000,
    backgroundColor: "#F4F4F8",

    height: 400,
    marginTop: -30,
    position: "absolute",
    backgroundColor: "#fff",
    // backgroundColor: "red",
    borderRadius: 20,
    // borderWidth: 1,
    // borderColor: "black",
    // borderStyle: "solid",
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
    zIndex: 1000,
  },
  addtask: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 0.5,
    height: 40,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 50,
    backgroundColor: "white",
    paddingHorizontal: 10,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,

    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "#1B2021",
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "purple",
    borderRadius: 8,
    color: "#1B2021",
    paddingRight: 30,
  },
});
