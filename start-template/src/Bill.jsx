import React from "react";
import { Page, Text, View, Document, StyleSheet, Image } from "@react-pdf/renderer";
import Cookies from "js-cookie";
import logo from './ywca-logo.jpg';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "white",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  subHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  recipientDetails: {
    alignItems: "left",
    borderBottomWidth: "1",
  },
  subHeaderText: {
    fontWeight: "bold",
    textAlign: "center",
    width: "20%",
    color: "orange",
  },
  billItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  }, 
  line: (boldness) => ({
    borderBottom: boldness, 
    borderBottomColor: "black",
    borderBottomStyle: "solid", 
    marginVertical: 5,
  })
});

export default function () {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Image src={logo} style={{width: "30%"}}/>
        <View style={styles.section}>
            <Text style={styles.textContainer}>Invoice To:</Text>
            <Text style={styles.valueContainer}>{Cookies.get("vendor")}</Text>
            <Text style={styles.valueContainer}>{Cookies.get("address")}</Text>
           <View style={styles.subHeader}>
            <Text style={styles.subHeaderText}>Description</Text>
            <Text style={styles.subHeaderText}>Usage</Text>
            <Text style={styles.subHeaderText}>Rate</Text>
            <Text style={styles.subHeaderText}>Subtotal</Text>
          </View>
          <View style = {styles.line({lineBoldness: 3})}></View>
          <View style={styles.billItem}>
            <Text style={styles.textContainer}>Tier Cost:</Text>
            
            <Text style={styles.valueContainer}>{Cookies.get("subtotal")}</Text>
          </View>
          <View style = {styles.line({lineBoldness: 1})}></View>
          <View style={styles.billItem}>
            <Text style={styles.textContainer}>Scholarship:</Text>
            <Text style={styles.valueContainer}>
              {Cookies.get("actualScholarship")}%
            </Text>
          </View>
          <View style={styles.billItem}>
            <Text style={styles.textContainer}>Subtotal:</Text>
            <Text style={styles.valueContainer}>
              {Cookies.get("subtotal") * Cookies.get("actualScholarship")}
            </Text>
          </View>
          <View style={styles.billItem}>
            <Text style={styles.textContainer}>Off Season:</Text>
            <Text style={styles.valueContainer}>
              {Cookies.get("offSeason")}
            </Text>
          </View>
          <View style={styles.billItem}>
            <Text style={styles.textContainer}>Dry Storage:</Text>
            <Text style={styles.valueContainer}>
              {Cookies.get("dryStorage")}
            </Text>
          </View>
          <View style={styles.billItem}>
            <Text style={styles.textContainer}>Fridge and Freezer:</Text>
            <Text style={styles.valueContainer}>{Cookies.get("freezer")}</Text>
          </View>
          <View style={styles.billItem}>
            <Text style={styles.textContainer}>Overtime:</Text>
            <Text style={styles.valueContainer}>{Cookies.get("overtime")}</Text>
          </View>
          <View style={styles.billItem}>
            <Text style={styles.textContainer}>Total:</Text>
            <Text style={styles.valueContainer}>{Cookies.get("cost")}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
