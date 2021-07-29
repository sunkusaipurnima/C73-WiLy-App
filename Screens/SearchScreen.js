/** @format */

/** @format */

import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";

import db from "../config";

const SearchScreen = (props) => {
  const [allTransactions, setAllTransactions] = useState([]);
  const [searchText, setSearchText] = useState("");

  console.log("all transactions", allTransactions);
  useEffect(() => {
    getAllTransactions();
  }, []);

  const getAllTransactions = () => {
    db.collection("transactions")
      .limit(10)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setAllTransactions([...allTransactions, doc.data()]);
        });
      })
      .catch((error) => {
        console.log("error while getting transactions", error);
      });
  };

  const handleSearch = () => {
    console.log("inside Handle search");
  };

  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Type Here"
            placeholderTextColor="#fff"
            onChangeText={(text) => setSearchText(text)}
          />
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => {
              handleSearch(searchText);
            }}
          >
            <Text style={styles.searchButtonText}> Search</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.lowerContainer}>
        <FlatList
          data={allTransactions}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={{ borderBottomWidth: 2 }}>
              <Text>{"Book Id: " + item.book_id}</Text>
              <Text>{"Student id: " + item.student_id}</Text>
              <Text>{"Transaction Type: " + item.transaction_type}</Text>
              <Text>{"Date: " + item.date.toDate()}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5653d4",
  },
  upperContainer: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  textInputContainer: {
    borderWidth: 2,
    borderRadius: 10,
    flexDirection: "row",
    backgroundColor: "#9dfd24",
    borderColor: "#fff",
  },
  textInput: {
    width: "57%",
    height: 50,
    padding: 10,
    borderColor: "#fff",
    borderRadius: 10,
    borderWidth: 2,
    fontSize: 18,
    backgroundColor: "#5653D4",
    fontFamily: "Rajdhani_600SemiBold",
    color: "#FFFFFF",
  },
  searchButton: {
    width: 100,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  searchButtonText: {
    fontSize: 24,
    color: "#0A0101",
    fontFamily: "Rajdhani_600SemiBold",
  },
  lowerContainer: {
    flex: 0.8,
    backgroundColor: "#fff",
  },
});

export default SearchScreen;
