import React, { useState,useEffect } from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer, Image } from '@react-pdf/renderer';

import { useLocation } from 'react-router-dom';


const Voucher = () => {

    // Reciveing students Data in location object 
 const  location=useLocation()

//  Getting Data



const batchVocuhers= location.state?.vouchersData
const batchVocuhersMonth=location.state?.month
let batchVocuhersAnnualCharges = location.state?.annualCharges
 let batchVoucherEnrollmentCharges= location.state?.enrollmentCharges 
 let labChargesBatch=location.state?.labCharges
// console.log(batcVoucherEnrollmentCharges)
console.log(batchVocuhers)

// singel Vocuher
const individualvoucherData= location.state?.voucherData
const enrollmentChargesIndvidual= location.state?.enrollmentCharges
// console.log(individualvoucherData)
const annualChargesIndividual=location.state?.annualCharges
const SingelvoucherMonth = location.state?.month 
let labChargesIndividual= location.state?.labCharges
console.log(labChargesIndividual)





// console.log(SingelvoucherMonth)

// console.log(annualChargesIndividual ? annualChargesIndividual:"no cheked" )
const styles = StyleSheet.create({
    titleSchool:{
        fontSize: 16,
        fontWeight: 'bold',
   
        textAlign:'center',
    },

    logo: {
        width: 50, // or whatever size you want
        height: 40, // or whatever size you want
        marginRight: 10, // some margin if needed
    },
    page: {
        padding: 20,
        backgroundColor: '#FFF',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 3,
    },
    title: {
        fontSize: 12,
        fontWeight: 'bold',
        border: '1px solid black',
        textAlign:'center',
        
    },
    subtitle: {
        fontSize: 10,
    },
    table: {
        width: '100%',
        border: '1px solid black',
        borderCollapse: 'collapse',
        marginBottom:8,
       
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 0,
        borderBottomColor: '#666',
    },
    tableCell: {
        flex: 1,
        border: '1px solid black',
        padding: 4,
        textAlign: 'center',
        fontSize: 11,
    },
    tableHeader: {
        backgroundColor: '#f4f4f4',
    },
    tableFooter: {

        borderTopColor: '#666',
    },
});



let totalFee;

const renderIndividualVoucher = () => {
        // Current Date
    let lateFee= individualvoucherData.lateFee ? individualvoucherData.lateFee: 0 

// singel
if(  individualvoucherData){
     totalFee= annualChargesIndividual+lateFee+ individualvoucherData.baseFee+labChargesIndividual+enrollmentChargesIndvidual
}else if(lateFee){
    totalFee=individualvoucherData.baseFee+lateFee
}
else{
    totalFee=individualvoucherData.baseFee
}



        let currentDate= Date.now()
        let timeStamp= new Date( currentDate)
    
       let date=  timeStamp.toISOString().split("T")[0]
    // Due Date
       let dateNow= new Date()
        let dueTimeStamp = new Date(dateNow.getTime() + (24 * 60 * 60 * 1000));
        let due = dueTimeStamp.toISOString().split("T")[0]
    return (
<br>
<View  >

<View style={styles.header}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
            style={styles.logo}
            src={process.env.PUBLIC_URL + '/SchoolLogo.png'}
        />
        <View>
            <Text style={styles.titleSchool}>Green Peace School</Text>
            <Text style={styles.subtitle}>Model Campus</Text>
        </View>
    </View>
</View>
            <Text style={styles.title}>Monthly Bill for {SingelvoucherMonth}</Text>
            <View style={styles.table}>
                <View style={styles.tableRow}>
                    <Text style={[styles.tableCell, {flex: 1}]}>Gr No</Text>
                    <Text style={[styles.tableCell, {flex: 2}]}>Student Name</Text>
                    <Text style={[styles.tableCell, {flex: 1}]}>Class</Text>
                    <Text style={[styles.tableCell, {flex: 3}]}>Fee Desc</Text> {/* Increased flex */}
                    <Text style={styles.tableCell}>Amount</Text>
                </View>
                <View style={styles.tableRow}>
                    <Text style={[styles.tableCell, {flex: 1}]} rowspan="6">{individualvoucherData.GRNo}</Text>
                    <Text style={[styles.tableCell, {flex: 2}]} rowspan="6">{individualvoucherData.studentName}</Text>
                    <Text style={[styles.tableCell, {flex: 1}]} rowspan="6">{individualvoucherData.className}</Text>
                    <Text style={[styles.tableCell, {flex: 3}]}>Tuition Fee of {SingelvoucherMonth}</Text> {/* Increased flex */}
                    <Text style={[styles.tableCell]}>{ totalFee} </Text>
                </View>
                <View style={styles.tableRow}>
                    <Text style={[styles.tableCell, {flex: 3}]}>Annual Charges</Text> {/* Increased flex */}
                    <Text style={[styles.tableCell]}>{annualChargesIndividual}</Text>
                </View>
                {/* Add other fee types similarly */}
                {/* Example: Lab Charges */}
                <View style={styles.tableRow}>
                    <Text style={[styles.tableCell, {flex: 3}]}>Lab Charges</Text> {/* Increased flex */}
                    <Text style={[styles.tableCell]}> {labChargesIndividual?labChargesIndividual:0}  </Text>
                </View>
                <View style={styles.tableRow}>
                    <Text style={[styles.tableCell, {flex: 3}]}>Erollment Charges</Text> {/* Increased flex */}
                    <Text style={[styles.tableCell]}>{enrollmentChargesIndvidual? enrollmentChargesIndvidual:0}</Text>    
                </View>
                <View style={styles.tableRow}>
                    <Text style={[styles.tableCell, {flex: 3}]}>Late Fee</Text> {/* Increased flex */}
                    <Text style={[styles.tableCell]}>{individualvoucherData.lateFee?lateFee:0}</Text>    
                </View>
                <View style={styles.tableRow}>
                    <Text style={[styles.tableCell, {flex: 1}]}>Issue Date</Text>
                    <Text style={[styles.tableCell, {flex: 2}]}>{date}</Text>
                    <Text rowspan="3" style={[styles.tableCell,{flex:1}]}>Payable Within Due Date</Text>
                    <Text style={[styles.tableCell]}>{totalFee}</Text>
                </View>
                <View style={styles.tableRow}>
                    <Text style={[styles.tableCell, {flex: 1}]}>Due Date</Text>
                    <Text style={[styles.tableCell, {flex: 2}]}>{due}</Text>
                    <Text style={[styles.tableCell]}>Payable After Due Date</Text>
                    <Text style={[styles.tableCell]}>{totalFee}</Text>
                </View>
            </View>
        </View>
    
// 2nd copy 

<View>
<View style={styles.header}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
            style={styles.logo}
            src={process.env.PUBLIC_URL + '/SchoolLogo.png'}
        />
        <View>
            <Text style={styles.titleSchool}>Green Peace School</Text>
            <Text style={styles.subtitle}>Model Campus</Text>
        </View>
    </View>
</View>
<Text style={styles.title}>Monthly Bill for {SingelvoucherMonth}</Text>
<View style={styles.table}>
<View style={styles.tableRow}>
    <Text style={[styles.tableCell, {flex: 1}]}>Gr No</Text>
    <Text style={[styles.tableCell, {flex: 2}]}>Student Name</Text>
    <Text style={[styles.tableCell, {flex: 1}]}>Class</Text>
    <Text style={[styles.tableCell, {flex: 2}]}>Fee Desc</Text>
    <Text style={styles.tableCell}>Amount</Text>
</View>
<View style={styles.tableRow}>
    <Text style={[styles.tableCell, {flex: 1}]} rowspan="6">{individualvoucherData.GRNo}
    </Text>
    <Text style={[styles.tableCell, {flex: 2}]} rowspan="4">{individualvoucherData.studentName}</Text>
    <Text style={[styles.tableCell, {flex: 1}]} rowspan="6">{individualvoucherData.className}</Text>
    <Text style={[styles.tableCell, {flex: 2}]} rowspan="3">Tuition Fee of {SingelvoucherMonth}</Text>
         <Text style={[styles.tableCell]} rowspan="3">{totalFee} </Text>
</View>

<View style={styles.tableRow}>
                    <Text style={[styles.tableCell, {flex: 3}]}>Annual Charges</Text> {/* Increased flex */}
                    <Text style={[styles.tableCell]}>{annualChargesIndividual}</Text>
                </View>
                {/* Add other fee types similarly */}
                {/* Example: Lab Charges */}
                <View style={styles.tableRow}>
                    <Text style={[styles.tableCell, {flex: 3}]}>Lab Charges</Text> {/* Increased flex */}
                    <Text style={[styles.tableCell]}>{labChargesIndividual?labChargesIndividual:0} </Text>
                </View>
                <View style={styles.tableRow}>
                    <Text style={[styles.tableCell, {flex: 3}]}>Erollment Charges</Text> {/* Increased flex */}
                    <Text style={[styles.tableCell]}>{enrollmentChargesIndvidual? enrollmentChargesIndvidual:0}</Text>    
                </View>
                
                <View style={styles.tableRow}>
                    <Text style={[styles.tableCell, {flex: 3}]}>Late Fee</Text> {/* Increased flex */}
                    <Text style={[styles.tableCell]}> {lateFee?lateFee:0} </Text>
                </View>

<View style={styles.tableRow}>
    <Text style={[styles.tableCell, {flex: 1}]}>Issue Date</Text>
    <Text style={[styles.tableCell, {flex: 2}]}>{date} </Text>
    <Text rowspan="3" style={[styles.tableCell,{flex:1}]}>Payable Within Due Date</Text>
    <Text style={[styles.tableCell]}>{totalFee}</Text>
</View>
<View style={styles.tableRow}>
    <Text style={[styles.tableCell, {flex: 1}]}>Due Date</Text>
    <Text style={[styles.tableCell, {flex: 2}]}>{due} </Text>
    <Text style={[styles.tableCell]}>Payable After Due Date</Text>
    <Text style={[styles.tableCell]}>{totalFee}</Text>
</View>
</View>
</View>
//3rd copy 

<View>
<View style={styles.header}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
            style={styles.logo}
            src={process.env.PUBLIC_URL + '/SchoolLogo.png'}
        />
        <View>
            <Text style={styles.titleSchool}>Green Peace School</Text>
            <Text style={styles.subtitle}>Model Campus</Text>
        </View>
    </View>
</View>
<Text style={styles.title}>Monthly Bill for {SingelvoucherMonth}</Text>

<View style={styles.table}>
<View style={styles.tableRow}>
    <Text style={[styles.tableCell, {flex: 1}]}>Gr No</Text>
    <Text style={[styles.tableCell, {flex: 2}]}>Student Name</Text>
    <Text style={[styles.tableCell, {flex: 1}]}>Class</Text>
    <Text style={[styles.tableCell, {flex: 2}]}>Fee Desc</Text>
    <Text style={styles.tableCell}>Amount</Text>
</View> <View style={styles.tableRow}>
                    <Text style={[styles.tableCell, {flex: 1}]}>{individualvoucherData.GRNo}</Text>
                    <Text style={[styles.tableCell, {flex: 2}]}>{individualvoucherData.studentName}</Text>
                    <Text style={[styles.tableCell, {flex: 1}]}>{individualvoucherData.className}</Text>
                    <Text style={[styles.tableCell, {flex: 2}]}>Tuition Fee of {SingelvoucherMonth}
                    
             
                    </Text>
                    
                    <Text style={[styles.tableCell]}>{totalFee}</Text>
                </View>
               
<View style={styles.tableRow}>
                    <Text style={[styles.tableCell, {flex: 3}]}>Annual Charges</Text> {/* Increased flex */}
                    <Text style={[styles.tableCell]}>{annualChargesIndividual}</Text>
                </View>
                {/* Add other fee types similarly */}
                {/* Example: Lab Charges */}
                <View style={styles.tableRow}>
                    <Text style={[styles.tableCell, {flex: 3}]}>Lab Charges</Text> {/* Increased flex */}
                    <Text style={[styles.tableCell]}>{labChargesIndividual?labChargesIndividual:0} </Text>
                </View>
                <View style={styles.tableRow}>
                    <Text style={[styles.tableCell, {flex: 3}]}>Erollment Charges</Text> {/* Increased flex */}
                    <Text style={[styles.tableCell]}>{enrollmentChargesIndvidual? enrollmentChargesIndvidual:0}</Text>    
                </View>
                
                <View style={styles.tableRow}>
                    <Text style={[styles.tableCell, {flex: 3}]}>Late Fee</Text> {/* Increased flex */}
                    <Text style={[styles.tableCell]}> {lateFee?lateFee:0} </Text>
                </View>

<View style={styles.tableRow}>
    <Text style={[styles.tableCell, {flex: 1}]}>Issue Date</Text>
    <Text style={[styles.tableCell, {flex: 2}]}>{date} </Text>
    <Text rowspan="3" style={[styles.tableCell,{flex:1}]}>Payable Within Due Date</Text>
    <Text style={[styles.tableCell]}>{totalFee}</Text>
</View>
<View style={styles.tableRow}>
    <Text style={[styles.tableCell, {flex: 1}]}>Due Date</Text>
    <Text style={[styles.tableCell, {flex: 2}]}>{due} </Text>
    <Text style={[styles.tableCell]}>Payable After Due Date</Text>
    <Text style={[styles.tableCell]}>{totalFee}</Text>
</View>
</View>
</View>

</br> 
    );
}; 
const renderBatchVouchers = () => {


    


   

    // Current Date
    let currentDate= Date.now()
    let timeStamp= new Date( currentDate)

   let date=  timeStamp.toISOString().split("T")[0]
// Due Date
   let dateNow= new Date()
    let dueTimeStamp = new Date(dateNow.getTime() + (24 * 60 * 60 * 1000));
    let due = dueTimeStamp.toISOString().split("T")[0]
    return batchVocuhers.map((individualvoucherData, index) => {
        let totalFee = 
        (individualvoucherData.baseFee || 0) + 
        (batchVocuhersAnnualCharges[index] || 0) + 
        (batchVoucherEnrollmentCharges[index] || 0) + 
        (labChargesBatch[index] || 0);
        let lateFee= individualvoucherData.lateFee ? individualvoucherData.lateFee: 0 
        // Add lateFee if present
        if (individualvoucherData.lateFee) {
            totalFee += individualvoucherData.lateFee;
        }
    
        // Add annual charges if present
  // Add annual charges if present
// if (batchVocuhersAnnualCharges && batchVocuhersAnnualCharges[index]) {
//     totalFee += batchVocuhersAnnualCharges[index];
// }

// // Add enrollment charges if present
// if (batchVoucherEnrollmentCharges && batchVoucherEnrollmentCharges[index]) {
//     totalFee += batchVoucherEnrollmentCharges[index];
// }

        // if(batcVoucherEnrollmentCharges[index]&& batchVocuhersAnnualCharges[index]){
        //     totalFee += batchVocuhersAnnualCharges[index]+batchVocuhersAnnualCharges[index];
        // }
     return (
<>
           <View>  


            
            <View style={styles.header}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
            style={styles.logo}
            src={process.env.PUBLIC_URL + '/SchoolLogo.png'}
        />
        <View>
            <Text style={styles.titleSchool}>Green Peace School</Text>
            <Text style={styles.subtitle}>Model Campus</Text>
        </View>
    </View>
              
            </View>
            <Text style={styles.title}>Monthly Bill for {batchVocuhersMonth}</Text>
            <View style={styles.table}>
                <View style={styles.tableRow}>
                    <Text style={[styles.tableCell, {flex: 1}]}>Gr No</Text>
                    <Text style={[styles.tableCell, {flex: 2}]}>Student Name</Text>
                    <Text style={[styles.tableCell, {flex: 1}]}>Class</Text>
                    <Text style={[styles.tableCell, {flex: 2}]}>Fee Desc</Text>
                    <Text style={styles.tableCell}>Amount</Text>
                </View>
                <View style={styles.tableRow}>
                    <Text style={[styles.tableCell, {flex: 1}]} rowspan="6">{individualvoucherData.GRNo}</Text>
                    <Text style={[styles.tableCell, {flex: 2}]} rowspan="4">{individualvoucherData.studentName}</Text>
                    <Text style={[styles.tableCell, {flex: 1}]} rowspan="6">{individualvoucherData.className}</Text>
                    <Text style={[styles.tableCell, {flex: 2}]} rowspan="3">Tuition Fee of {batchVocuhersMonth}</Text>
                    <Text style={[styles.tableCell]} rowspan="3">{ totalFee  } </Text>
                </View>
                {/* extra fees info  */}

                <View style={styles.tableRow}>
                    <Text style={[styles.tableCell, {flex: 3}]}>Annual Charges</Text> {/* Increased flex */}
                    <Text style={[styles.tableCell]}>{annualChargesIndividual? annualChargesIndividual[index]:0 }</Text>
                </View>
                {/* Add other fee types similarly */}
                {/* Example: Lab Charges */}
                <View style={styles.tableRow}>
                    <Text style={[styles.tableCell, {flex: 3}]}>Lab Charges</Text> {/* Increased flex */}
                    <Text style={[styles.tableCell]}>{labChargesBatch?labChargesBatch[index]:0}</Text>
                </View>
                <View style={styles.tableRow}>
                    <Text style={[styles.tableCell, {flex: 3}]}>Erollment Charges</Text> {/* Increased flex */}
                    <Text style={[styles.tableCell]  }>{enrollmentChargesIndvidual? enrollmentChargesIndvidual[index]:0}</Text>    
                </View>
                <View style={styles.tableRow}>
                    <Text style={[styles.tableCell, {flex: 3}]}>Late Fee</Text> {/* Increased flex */}
                    <Text style={[styles.tableCell]}> {lateFee?lateFee:0} </Text>
                </View>



                <View style={styles.tableRow}>
                    <Text style={[styles.tableCell, {flex: 1}]}>Issue Date</Text>
                    <Text style={[styles.tableCell, {flex: 2}]}> 
                    {date}
                    </Text>
                    <Text rowspan="3" style={[styles.tableCell,{flex:1}]}>Payable Within Due Date</Text>
                    <Text style={[styles.tableCell]}>{totalFee}</Text>
                </View>
                <View style={styles.tableRow}>
                    <Text style={[styles.tableCell, {flex: 1}]}>Due Date</Text>
                    <Text style={[styles.tableCell, {flex: 2}]}> 
                    {due}</Text>
                    <Text style={[styles.tableCell]}>Payable After Due Date</Text>
                    <Text style={[styles.tableCell]}>{totalFee}</Text>
                </View>
            </View>
        </View>
// 2nd copy 

<View>
<View style={styles.header}>
<View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
            style={styles.logo}
            src={process.env.PUBLIC_URL + '/SchoolLogo.png'}
        />
        <View>
            <Text style={styles.titleSchool}>Green Peace School</Text>
            <Text style={styles.subtitle}>Model Campus</Text>
        </View>
    </View>
          
        </View>
<Text style={styles.title}>Monthly Bill for {batchVocuhersMonth}</Text>
<View style={styles.table}>
    <View style={styles.tableRow}>
        <Text style={[styles.tableCell, {flex: 1}]}>Gr No</Text>
        <Text style={[styles.tableCell, {flex: 2}]}>Student Name</Text>
        <Text style={[styles.tableCell, {flex: 1}]}>Class</Text>
        <Text style={[styles.tableCell, {flex: 2}]}>Fee Desc</Text>
        <Text style={styles.tableCell}>Amount</Text>
    </View>
    <View style={styles.tableRow}>
        <Text style={[styles.tableCell, {flex: 1}]} rowspan="6">{individualvoucherData.GRNo}</Text>
        <Text style={[styles.tableCell, {flex: 2}]} rowspan="4">{individualvoucherData.studentName}</Text>
        <Text style={[styles.tableCell, {flex: 1}]} rowspan="6">{individualvoucherData.className}</Text>
        <Text style={[styles.tableCell, {flex: 2}]} rowspan="3">Tuition Fee of {batchVocuhersMonth}</Text>
        <Text style={[styles.tableCell]} rowspan="3">{totalFee} </Text>
    </View>

    {/* extra fee */}

    <View style={styles.tableRow}>
                    <Text style={[styles.tableCell, {flex: 3}]}>Annual Charges</Text> {/* Increased flex */}
                    <Text style={[styles.tableCell]}>{annualChargesIndividual? annualChargesIndividual[index]:0 }</Text>
                </View>
                {/* Add other fee types similarly */}
                {/* Example: Lab Charges */}
                <View style={styles.tableRow}>
                    <Text style={[styles.tableCell, {flex: 3}]}>Lab Charges</Text> {/* Increased flex */}
                    <Text style={[styles.tableCell]}>{labChargesBatch?labChargesBatch[index]:0}</Text>
                </View>
                <View style={styles.tableRow}>
                    <Text style={[styles.tableCell, {flex: 3}]}>Erollment Charges</Text> {/* Increased flex */}
                    <Text style={[styles.tableCell]}>{enrollmentChargesIndvidual? enrollmentChargesIndvidual[index]:0}</Text>    
                </View>

                <View style={styles.tableRow}>
                    <Text style={[styles.tableCell, {flex: 3}]}>Late Fee</Text> {/* Increased flex */}
                    <Text style={[styles.tableCell]}> {lateFee?lateFee:0} </Text>
                </View>


    <View style={styles.tableRow}>
        <Text style={[styles.tableCell, {flex: 1}]}>Issue Date</Text>
        <Text style={[styles.tableCell, {flex: 2}]}>{date} </Text>
        <Text rowspan="3" style={[styles.tableCell,{flex:1}]}>Payable Within Due Date</Text>
        <Text style={[styles.tableCell]}>{totalFee}</Text>
    </View>
    <View style={styles.tableRow}>
        <Text style={[styles.tableCell, {flex: 1}]}>Due Date</Text>
        <Text style={[styles.tableCell, {flex: 2}]}>{due} </Text>
        <Text style={[styles.tableCell]}>Payable After Due Date</Text>
        <Text style={[styles.tableCell]}>{totalFee}</Text>
    </View>
</View>
</View>
//3rd copy 

<View>
<View style={styles.header}>
            
<View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
            style={styles.logo}
            src={process.env.PUBLIC_URL + '/SchoolLogo.png'}
        />
        <View>
            <Text style={styles.titleSchool}>Green Peace School</Text>
            <Text style={styles.subtitle}>Model Campus</Text>
        </View>
    </View>
          
        </View>
<Text style={styles.title}>Monthly Bill for {batchVocuhersMonth}</Text>

<View style={styles.table}>
    <View style={styles.tableRow}>
        <Text style={[styles.tableCell, {flex: 1}]}>Gr No</Text>
        <Text style={[styles.tableCell, {flex: 2}]}>Student Name</Text>
        <Text style={[styles.tableCell, {flex: 1}]}>Class</Text>
        <Text style={[styles.tableCell, {flex: 2}]}>Fee Desc</Text>
        <Text style={styles.tableCell}>Amount</Text>
    </View>
    <View style={styles.tableRow}>
        <Text style={[styles.tableCell, {flex: 1}]} rowspan="6">{individualvoucherData.GRNo}</Text>
        <Text style={[styles.tableCell, {flex: 2}]} rowspan="4">{individualvoucherData.studentName}</Text>
        <Text style={[styles.tableCell, {flex: 1}]} rowspan="6">{individualvoucherData.className}</Text>
        <Text style={[styles.tableCell, {flex: 2}]} rowspan="3">Tuition Fee of {batchVocuhersMonth}</Text>
        <Text style={[styles.tableCell]} rowspan="3">{totalFee} </Text>
    </View>
        {/* extra */}


        <View style={styles.tableRow}>
                    <Text style={[styles.tableCell, {flex: 3}]}>Annual Charges</Text> {/* Increased flex */}
                    <Text style={[styles.tableCell]}>{annualChargesIndividual? annualChargesIndividual[index]:0 }</Text>
                </View>
                {/* Add other fee types similarly */}
                {/* Example: Lab Charges */}
                <View style={styles.tableRow}>
                    <Text style={[styles.tableCell, {flex: 3}]}>Lab Charges</Text> {/* Increased flex */}
                    <Text style={[styles.tableCell]}>{labChargesBatch?labChargesBatch[index]:0}</Text>
                </View>
                <View style={styles.tableRow}>
                    <Text style={[styles.tableCell, {flex: 3}]}>Erollment Charges</Text> {/* Increased flex */}
                    <Text style={[styles.tableCell]}>{enrollmentChargesIndvidual? enrollmentChargesIndvidual[index]:0}</Text>    
                </View>
                <View style={styles.tableRow}>
                    <Text style={[styles.tableCell, {flex: 3}]}>Late Fee</Text> {/* Increased flex */}
                    <Text style={[styles.tableCell]}> {lateFee?lateFee:0} </Text>
                </View>


    <View style={styles.tableRow}>
        <Text style={[styles.tableCell, {flex: 1}]}>Issue Date</Text>
        <Text style={[styles.tableCell, {flex: 2}]}>{date} </Text>
        <Text rowspan="3" style={[styles.tableCell,{flex:1}]}>Payable Within Due Date</Text>
        <Text style={[styles.tableCell]}>{totalFee}</Text>
    </View>
    <View style={styles.tableRow}>
        <Text style={[styles.tableCell, {flex: 1}]}>Due Date</Text>
        <Text style={[styles.tableCell, {flex: 2}]}>{due} </Text>
        <Text style={[styles.tableCell]}>Payable After Due Date</Text>
        <Text style={[styles.tableCell]}>{totalFee}</Text>
    </View>
</View>
</View>




</>
      );
    });
  }


const renderContent=()=>{
if( location.state.from==="generateAll"){
    return   renderBatchVouchers()
}else if (location.state.from==="generateSingle") {
    return renderIndividualVoucher()
}



}



  return (

    <PDFViewer width="100%" height="600">
 
    <Document>
    <Page size="A4" style={styles.page}>

                    {renderContent()}
                 

   
      </Page>
    </Document>

  </PDFViewer>

   

)}
 
export default Voucher;
