import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList
} from "react-native";
import { Avatar, ListItem, Icon } from "react-native-elements";
import db from "../config";

export default class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allTransactions: [],
      searchText: ""
    };
  }
  componentDidMount = async () => {
    this.getTransactions();
  };

  getTransactions = () => {
    db.collection("transactions")
      .get()
      .then(snapshot => {
        snapshot.docs.map(doc => {
          this.setState({
            allTransactions: [...this.state.allTransactions, doc.data()],
          });
        });
      });
  };

  

  
  renderItem = ({ item, i }) => {
    var date = item.date
      .toDate()
      .toString()
      .split(" ")
      .splice(0, 4)
      .join(" ");

    var transactionType =
      item.transaction_type === "issue" ? "entregue" : "devolvido";
    return (
      <View style={{ borderWidth: 1 }}>
        <ListItem key={i} bottomDivider>
          <Icon type={"antdesign"} name={"book"} size={40} />
          <ListItem.Content>
            <ListItem.Title style={styles.title}>
              {`${item.book_name} ( ${item.book_id} )`}
            </ListItem.Title>
            <ListItem.Subtitle style={styles.subtitle}>
              {`Este livro foi ${transactionType} por ${item.student_name}`}
            </ListItem.Subtitle>
            <View style={styles.lowerLeftContaiiner}>
              <View style={styles.transactionContainer}>
                <Text
                  style={[
                    styles.transactionText,
                    {
                      color:
                        item.transaction_type === "issue"
                          ? "#78D304"
                          : "#0364F4"
                    }
                  ]}
                >
                  {item.transaction_type.charAt(0).toUpperCase() +
                    item.transaction_type.slice(1)}
                </Text>
                <Icon
                  type={"ionicon"}
                  name={
                    item.transaction_type === "issue"
                      ? "checkmark-circle-outline"
                      : "arrow-redo-circle-outline"
                  }
                  color={
                    item.transaction_type === "issue" ? "#78D304" : "#0364F4"
                  }
                />
              </View>
              <Text style={styles.date}>{date}</Text>
            </View>
          </ListItem.Content>
        </ListItem>
      </View>
    );
  };

//cria a função de procurar um livro especifico

handleSearch = async text => {






}
  
  render() {
    const { searchText, allTransactions } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.upperContainer}>
          <View style={styles.textinputContainer}>
            <TextInput
              style={styles.textinput}
              onChangeText={text => this.setState({ searchText: text })}
              placeholder={"Escreva aqui"}
              placeholderTextColor={"#FFFFFF"}
            />
            <TouchableOpacity
              style={styles.scanbutton}
            >
              <Text style={styles.scanbuttonText}>Pesquisar</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.lowerContainer}>
       // crie a FlatList
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5653D4"
  },
  upperContainer: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center"
  },
  textinputContainer: {
    borderWidth: 2,
    borderRadius: 10,
    flexDirection: "row",
    backgroundColor: "#9DFD24",
    borderColor: "#FFFFFF"
  },
  textinput: {
    width: "57%",
    height: 50,
    padding: 10,
    borderColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 3,
    fontSize: 18,
    backgroundColor: "#5653D4",
    color: "#FFFFFF"
  },
  scanbutton: {
    width: 100,
    height: 50,
    backgroundColor: "#9DFD24",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  scanbuttonText: {
    fontSize: 20,
    color: "#0A0101",
  },
  lowerContainer: {
    flex: 0.8,
    backgroundColor: "#FFFFFF"
  },
  title: {
    fontSize: 20,
  },
  subtitle: {
    fontSize: 16,
  },
  lowerLeftContaiiner: {
    alignSelf: "flex-end",
    marginTop: -40
  },
  transactionContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  transactionText: {
    fontSize: 20,

  },
  date: {
    fontSize: 12,
    paddingTop: 5
  }
});
