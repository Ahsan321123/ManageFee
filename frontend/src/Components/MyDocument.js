// MyDocument.js
import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
    marginLeft:20
  },


  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    textAlign: 'center',
    fontSize:15
},

  studentRow: {
    flexDirection: 'row',
    marginVertical: 5
  },
  headerRow: {
    flexDirection: 'row',
    borderBottom: '1pt solid black',
    marginBottom: 5
  },
  gr: {
    width: '10%',
  },
  studentName: {
    width: '40%',
    paddingLeft: 10
  },
  dueMonths: {
    width: '40%',
    display:'flex',
    flexDirection: 'column',
    paddingLeft: 10
  }
});

const MyDocument = ({ students, className }) => {

if( className==="All Classes"){
    return(
        <Document>
                        <Page size="A4" style={styles.page}>
                        <View style={styles.section}>
                        <Text >Green Peace School</Text>
            <Text>List of Outstanding Dues</Text>
            <View style={styles.headerRow}>
              <Text style={styles.gr}>GR No</Text>
              <Text style={styles.studentName}>Student Name</Text>
              <Text style={styles.dueMonths}> Class Name</Text>
              <Text style={styles.dueMonths}>Due Months</Text>
            </View>
        {students.map( (student ) =>(
            <> 

    
          <View style={styles.studentRow} key={student._id}>
   
                <Text style={styles.gr}>{student.GRNo}</Text>
                <Text style={styles.studentName}>{student.studentName}</Text>
                <Text style={styles.studentName}>{student.className}</Text>
                <Text style={styles.dueMonths}>
                 Tution Fee of-{student.feeStatus.map(s => s.status === 'Due' ? s.month : '').join(', ')}
                </Text>
              </View>
     
              </>

    
    
        ))}
        </View>
        </Page>
          </Document>


    )
}else{

    return (

      <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Green Peace School</Text>
          <Text>List of Outstanding Dues</Text>
          <Text>Class: {className}</Text>
          <View style={styles.headerRow}>
            <Text style={styles.gr}>GR No</Text>
            <Text style={styles.studentName}>Student Name</Text>
            <Text style={styles.dueMonths}>Due Months</Text>
          </View>
          {students.map(student => (
            <View style={styles.studentRow} key={student._id}>
              <Text style={styles.gr}>{student.GRNo}</Text>
              <Text style={styles.studentName}>{student.studentName}</Text>
              <View style={styles.dueMonths}>
                {student.feeStatus.map(s => s.status === 'Due' && (
                  <Text key={s.month}> Tution fee of -( {s.month} ) </Text>
                ))}
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
        

    )
}



};

export default MyDocument;
