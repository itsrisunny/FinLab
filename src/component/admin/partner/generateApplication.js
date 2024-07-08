
import moment from 'moment';
import { jsPDF } from "jspdf";

const generateApplication =(data)=>{
    let v = data[0]; 


   let  bankDetails= [[
         v?.bankDetails[0]?.bankAccont ?  v?.bankDetails[0]?.bankAccont : "",
         v?.bankDetails[0]?.accountHolderName ?  v?.bankDetails[0]?.accountHolderName : "",
         v?.bankDetails[0]?.ifsc ? v?.bankDetails[0]?.ifsc : "",
         v?.bankDetails[0]?.branchAddress ? v?.bankDetails[0]?.branchAddress : "",
   ]]  

    let ph = v.phoneNumber.substr(0, 3)+ '-' + v.phoneNumber.substr(3, 3)+ '-' + v.phoneNumber.substr(6, 4);

    let doc = new jsPDF('p', 'mm', 'a4');
    doc.setFontSize(30);
    doc.text(" Partner Application Form", 50, 15);

     /********General Info & Loan Info************ */
    
    // line for headings of general and loan info
    doc.setDrawColor(102, 153, 204)
    doc.setLineWidth(0.5);
    doc.line(10,30,200,30)
    doc.setDrawColor(0, 0, 0);

    doc.setFontSize(12);
    doc.setFont(undefined, 'bold')
    doc.text("General Info", 10, 27);  //general
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal')
    doc.text("Name:", 10, 35);
     doc.text(v.name, 55, 35);
    doc.text("Email Id:", 10, 40);
    doc.text(v.emailId, 55, 40);
    doc.text("Phone No:", 10, 45);
    doc.text(v.phoneNumber ? ph : "" , 55, 45);
    doc.text("Applied date:", 10, 50);
    doc.text(v.appliedDate?moment(v.appliedDate,"YYYY-MM-DD hh:mm:ss").format("DD/MM/YYYY"):"", 55, 50);

    /********Personal & Employement details************ */

    //line for headers of personal details
    doc.setDrawColor(102, 153, 204)
    doc.setLineWidth(0.5);
    doc.line(10,70,200,70)
    doc.setDrawColor(0, 0, 0);


    doc.setFontSize(12);
    doc.setFont(undefined, 'bold')
    doc.text("Personal details", 10, 67);  //Personal details
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal')
    
    doc.text("Name (Comapany):", 10, 75);
    doc.text(v.name?v.name:"", 55, 75);
    doc.text("Pan Number:", 10, 80);
    doc.text(v.panNumber?v.panNumber:"" , 55, 80);
    doc.text("Address:", 10, 85);
    doc.text((v.companyAddress.address1 ? v.companyAddress.address1+", " :"") + (v.companyAddress.address2 ? v.companyAddress.address2+", ":"") + (v.companyAddress.landmark ? v.companyAddress.landmark+", ":"")+ (v.companyAddress.city ? v.companyAddress.city+ ", " : "")+(v.companyAddress.state ? v.companyAddress.state + ", ":"")+(v.companyAddress.pincode), 55, 85);
    
    //line for headers of employement details
    doc.setDrawColor(102, 153, 204)
    doc.setLineWidth(0.5);
    doc.line(10,105,200,105)
    doc.setDrawColor(0, 0, 0);

    doc.setFontSize(12);
    doc.setFont(undefined, 'bold')
    doc.text("Employment details", 10, 102);
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal')
    doc.text("GSTIN number:", 10, 110);
    doc.text(v.gstinNumber ? v.gstinNumber : "", 55, 110);
    doc.text("Business vintage:", 10, 115);
    doc.text(v.businessVintage ? v.businessVintage : "" , 55, 115);
    doc.text("Is Company Registered:", 10, 120);
    doc.text(v.isCompnayRegistered ?v.isCompnayRegistered:"", 55, 120);
    doc.text("Office Setup:", 10, 125);
    doc.text(v.officeSetup ?v.officeSetup :"", 55, 125);
    doc.text("No. Of Employees:", 10, 130);
    doc.text(v.noOfEmployees ?v.noOfEmployees :"", 55, 130);
    
      /*********bank details************** */



      // doc.setFontSize(13);
      // doc.setFont(undefined, 'bold')
      // doc.text("Bank details", 10, 110);
      // const bankHeaders = ["Account Number", "Account Holder Name", "IFSC", "Branch "];
      // const datasBK = bankDetails;
  
  
  
      // // Set the table starting position
      // let xx = 10;
      // // Set the column widths
      // const columnWidthsBK = [50, 50, 50, 100];
      // // Set the table styles
      // const headerStyleBK = { fillColor: "#f3f5f5", textColor: "#292626" };
      // const rowStyleBK = { fillColor: "#f2f2f2" };
      // doc.setFontSize(12);
      // // Draw the table headers
      // bankHeaders.forEach((header, index) => {
      //   doc.setFillColor(headerStyleBK.fillColor);
      //   doc.setTextColor(headerStyleBK.textColor);
      //   // doc.setFontStyle("bold");
      //   doc.rect(xx, 115, columnWidthsBK[index], 10, "F");
      //   doc.text(header, xx + 2, 120);
      //   xx += columnWidthsBK[index];
      // });
  
      // doc.setFontSize(10);
      // xx = 10;
      // let yy = 125;
      // // Draw the table rows
      // datasBK.forEach((row) => {
  
      //   row.forEach((cell, index) => {
      //     doc.setFillColor(rowStyleBK.fillColor);
      //     doc.setTextColor(0, 0, 0);
      //     doc.rect(xx, yy, columnWidthsBK[index], 10, "F");
      //     doc.text(cell, xx + 2, yy + 3);
      //     xx += columnWidthsBK[index];
      //   });
      //   yy = yy + 5;
      //   xx = 10;
      // });

      let startY  = 130;
    doc.setDrawColor(102, 153, 204)
    doc.setLineWidth(0.5);
    doc.line(10, startY + 15, 200, startY + 15)
    doc.setDrawColor(0, 0, 0);

    doc.setFontSize(13);
    doc.setFont(undefined, 'bold')
    //doc.setFont(undefined)
    doc.text("Bank details", 10, startY + 12);
    const bankHeaders = ["Account Holder Name", "Account Number", "IFSC", "Branch Address"];
    const datasBK = bankDetails;

    let xx = 10;
    const columnWidthsBK = [50, 50, 40, 55];
    const headerStyleBK = { fillColor: "#f3f5f5", textColor: "#292626" };
    const rowStyleBK = { fillColor: "#f2f2f2" };
    doc.setFontSize(12);
    bankHeaders.forEach((header, index) => {
      doc.setFillColor(headerStyleBK.fillColor);
      doc.setTextColor(headerStyleBK.textColor);
      // doc.setFontStyle("bold");
        doc.rect(xx, startY + 20, columnWidthsBK[index], 10, "D");
        doc.text(header, xx + 2, startY + 25);
        xx += columnWidthsBK[index];
      });

    doc.setFontSize(10);
    xx = 10;
    let yy = startY + 30;
    // Draw the table rows
    datasBK.forEach((row) => {
      let lines = [];
      row.forEach((cell, index) => {
        doc.setFillColor(rowStyleBK.fillColor);
        doc.setTextColor(0, 0, 0);
        doc.setFont('Calibri','normal',500)
        doc.rect(xx, yy, columnWidthsBK[index], 15, "D");

        if (bankHeaders[index] === "Branch Address") {
          let words = cell.split(' ');
          let currentLine = '';
          const wordsPerLine = 20;

          words.forEach((word) => {
            if ((currentLine + word).length <= wordsPerLine) {
              currentLine += (currentLine === '' ? '' : ' ') + word;
            } else {
              lines.push(currentLine);
              currentLine = word;
            }
          });

          if (currentLine !== '') {
            lines.push(currentLine);
          }

          lines.forEach((line, i) => {
            doc.text(line, xx + 2, yy + 6 + i * 5);
          });
        } else {

          doc.text(cell, xx + 2, yy + 6);
        }

        xx += columnWidthsBK[index];
      });
      yy += 5 * Math.ceil(lines.length / 2);
      xx = 10;
    });
      //window.open(doc.output('bloburl'))

doc.output ('save', v.panNumber+'.pdf');


}

export default generateApplication;