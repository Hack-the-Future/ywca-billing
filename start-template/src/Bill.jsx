import React from "react";
import { Page, Text, View, Document, StyleSheet, Image } from "@react-pdf/renderer";
import Cookies from "js-cookie";
import logo from './ywcalogo.png';

// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
  },
  section: {
    display: "flex",
    margin: 10,
    padding: "10px",
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
    width: "20%",
    color: "#FA4616",
    marginTop: 15,
  },
  billItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  }, 
  line: {
    borderBottom: 2, 
    borderBottomColor: "black",
    borderBottomStyle: "solid", 
    marginVertical: 5,
    marginTop: 5,
    marginBottom: 15,
  },
  divider: {
    borderBottomWidth: 0.5, 
    borderBottomColor: "gray",
    borderBottomStyle: "solid",
    marginBottom: 8,
  },
});

const dateObj = new Date();
const month   = dateObj.getUTCMonth() + 1; // months from 1-12
const day     = dateObj.getUTCDate();
const year    = dateObj.getUTCFullYear();
const mlist = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

export default function () {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between", height: "100px"}}>
          <Text style={{...styles.textContainer, fontSize: "40px", fontWeight: "bold", margin: "20px", paddingTop: "10px"}}>Invoice</Text>
          <a href="https://www.ywcalafayette.org/">
            <Image src={logo} style={{maxWidth: '400px', height: '65%', margin: '10px', marginTop: "20px", float: 'right'}}/>
          </a>
        </View>
        <br /> <br />
        <View style={{...styles.section, lineHeight: "1.5"}}>
          <Text style={{...styles.textContainer, fontsize: "20px"}}>Invoice To:</Text>
          <Text style={styles.valueContainer}>{Cookies.get("vendor")}</Text>
          <Text style={styles.valueContainer}>{Cookies.get("address")}</Text>
          <Text style={styles.valueContainer}>{mlist[month]}, {year}</Text>
          <View style={styles.subHeader}>
            <Text style={styles.subHeaderText}>Description</Text>
            <Text style={{...styles.subHeaderText, textAlign: "right"}}>Subtotal</Text>
          </View>
          <View style = {styles.line}></View>
          <View style={styles.billItem}>
            <Text style={styles.textContainer}>Tier Cost:</Text>
            
            <Text style={styles.valueContainer}>{Cookies.get("subtotal")}</Text>
          </View>
          <View style={styles.divider}></View>
          <View style={styles.billItem}>
            <Text style={styles.textContainer}>Scholarship:</Text>
            <Text style={styles.valueContainer}>
              {Cookies.get("actualScholarship")}%
            </Text>
          </View>
          <View style = {styles.divider}></View>
          <View style={styles.billItem}>
            <Text style={{...styles.textContainer, color: "#FA4616", fontSize: "20px",}}>Subtotal:</Text>
            <Text style={styles.valueContainer}>
              {Cookies.get("hoursTimesScholarship")}
            </Text>
          </View>
          <View style = {styles.divider}></View>
          <View style={styles.billItem}>
            <Text style={styles.textContainer}>Off Season:</Text>
            <Text style={styles.valueContainer}>
              {Cookies.get("offSeason")}
            </Text>
          </View>
          <View style = {styles.divider}></View>
          <View style={styles.billItem}>
            <Text style={styles.textContainer}>Dry Storage:</Text>
            <Text style={styles.valueContainer}>
              {Cookies.get("dryStorage")}
            </Text>
          </View>
          <View style = {styles.divider}></View>
          <View style={styles.billItem}>
            <Text style={styles.textContainer}>Fridge and Freezer:</Text>
            <Text style={styles.valueContainer}>{Cookies.get("freezer")}</Text>
          </View>
          <View style = {styles.divider}></View>
          <View style={styles.billItem}>
            <Text style={styles.textContainer}>Overtime:</Text>
            <Text style={styles.valueContainer}>{Cookies.get("overtime")}</Text>
          </View>
          <View style = {styles.line}></View>
          <View style={styles.billItem}>
            <Text style={styles.textContainer}>Total:</Text>
            <Text style={styles.valueContainer}>${Cookies.get("cost")}</Text>
          </View>
          <View style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Text style={{paddingTop: "20px", fontSize: "20px"}}>
              Thank you!
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
