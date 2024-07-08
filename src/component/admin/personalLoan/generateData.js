import moment from 'moment';
import { jsPDF } from "jspdf";

const generateData = (data) => {
  let v = data[0];

  let xt = v?.directorData;
  if (v?.directorData?.length) {
    xt.map((x) => {
      delete x.id;
      delete x.case_id;
      delete x.pan_doc_path;
      delete x.aadhar_front_doc_path;
      delete x.aadhar_back_doc_path;
    });
  }
  let dirData = xt?.length ? xt.map(obj => Object.values(obj)) : [[]];

  let bd = v?.bankDetails;
  if (v?.bankDetails?.length) {
    bd.map((x) => {
      delete x.id;
      delete x.case_id;
      delete x.user_id;
      delete x.offer_id;
      delete x.filename;
      delete x.path;
      delete x.is_deleted;
      delete x.created_on;
      delete x.updated_on;
    });
  }
  let bdData = bd?.length ? bd.map(obj => Object.values(obj)) : [[]];

  let ph = v.phoneNumber.substr(0, 3) + '-' + v.phoneNumber.substr(3, 3) + '-' + v.phoneNumber.substr(6, 4);

  let doc = new jsPDF('p', 'mm', 'a4');
  doc.setFontSize(30);
  doc.text("Application Form", 65, 15);

  /********General Info & Loan Info************ */
  let startY = 30;
  let startY1 = 30;

  //  general and loan info
  doc.setDrawColor(102, 153, 204);
  doc.setLineWidth(0.5);
  doc.line(10, startY, 200, startY);
  doc.setDrawColor(0, 0, 0);

  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text("General Info", 10, startY - 3);
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  doc.text("Case No:", 10, startY + 5);
  doc.text(v.caseNumber, 55, startY + 5);
  doc.text("Name:", 10, startY + 10);

  // Logic for name to get in between co-ordinates in a4 paper
  let startNameX = 55;
  let startNameY = startY + 10;
  const maxWidthName = 15;
  const lineHeightName = 5;
  let myName = v.name ? v.name : "";
  const wordsName = myName.split(' ');
  let currentLineName = '';

  for (const wordName of wordsName) {
    const currentWidthName = doc.getStringUnitWidth(currentLineName + ' ' + wordName);
    if (currentWidthName <= maxWidthName) {
      currentLineName += (currentLineName === '' ? '' : ' ') + wordName;
    } else {
      doc.text(currentLineName, startNameX, startNameY);
      startNameY += lineHeightName;
      currentLineName = wordName;
    }
  }
  doc.text(currentLineName, startNameX, startNameY);

  startY = startNameY + 5;

  if (v.emailId) {
    doc.text("Email Id:", 10, startY);
    doc.text(v.emailId, 55, startY);
    startY += 5;
  }

  if (v.phoneNumber) {
    doc.text("Phone No:", 10, startY);
    doc.text(ph, 55, startY);
    startY += 5;
  }

  if (v.appliedDate) {
    doc.text("Applied Date:", 10, startY);
    doc.text(moment(v.appliedDate, "YYYY-MM-DD hh:mm:ss").format("DD/MM/YYYY"), 55, startY);
    startY += 5;
  }

  // Print Loan Info only if loanAmountRequired exists
  if (v.loanAmountRequired !== undefined) {
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text("Loan Info", 120, startY1 - 3);
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.text("Loan Amt. Req:", 120, startY1 + 5)
    doc.text(v.loanAmountRequired ? "Rs." + parseFloat(v.loanAmountRequired).toLocaleString("en-IN", { maximumSignificantDigits: 3 }) : "", 165, startY1 + 5);

    if (v.loanPurpose) {
      doc.text("Loan Purpose:", 120, startY1 + 10);
      doc.text(v.loanPurpose, 165, startY1 + 10);
    }

    if (v.subLoanPurpose) {
      doc.text("Sub Loan Purpose:", 120, startY1 + 15);
      doc.text(v.subLoanPurpose, 165, startY1 + 15);
    }

    if (v.loanDuration) {
      doc.text("Req. Loan Duration:", 120, startY1 + 20);
      doc.text(v.loanDuration + "Years", 165, startY1 + 20);
    }
  }

  /********Personal & Employement details************ */
  startY += 5;

  let startYpersonal = startY;
  //personal and employement details
  doc.setDrawColor(102, 153, 204);
  doc.setLineWidth(0.5);
  doc.line(10, startY, 200, startY);
  doc.setDrawColor(0, 0, 0);

  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text("Personal Details", 10, startY - 3);
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');

  if (v.businessType) {
    doc.text("Type of Business:", 10, startY + 5);
    doc.text(v.businessType, 55, startY + 5);
    startY += 5;
  }

  doc.text("Name:", 10, startY + 5);

  let startXNameC = 55;
  let startYNameC = startY + 5;
  const maxWidthNameC = 15;
  const lineHeightNameC = 5;
  let myNameC = v.name ? v.name : "";
  const wordsNameC = myNameC.split(' ');
  let currentLineNameC = '';

  for (const wordNameC of wordsNameC) {
    const currentWidthNameC = doc.getStringUnitWidth(currentLineNameC + ' ' + wordNameC);
    if (currentWidthNameC <= maxWidthNameC) {
      currentLineNameC += (currentLineNameC === '' ? '' : ' ') + wordNameC;
    } else {
      doc.text(currentLineNameC, startXNameC, startYNameC);
      startYNameC += lineHeightNameC;
      currentLineNameC = wordNameC;
    }
  }
  doc.text(currentLineNameC, startXNameC, startYNameC);

  startY = startYNameC + 5;

  if (v.panNumber) {
    doc.text("Pan Number:", 10, startY);
    doc.text(v.panNumber, 55, startY);
    startY += 5;
  }

  if (v.aadhaar) {
    doc.text("Aadhar Number:", 10, startY);
    doc.text(v.aadhaar, 55, startY);
    startY += 5;
  }

  if (v.dateOfBirth) {
    doc.text("Date of Birth:", 10, startY);
    doc.text(moment(v.dateOfBirth, "YYYY-MM-DD hh:mm:ss").format("DD/MM/YYYY"), 55, startY);
    startY += 5;
  }

  if (v.dateOfIncorporation) {
    doc.text("Date of Incorporation:", 10, startY);
    doc.text(moment(v.dateOfIncorporation, "YYYY-MM-DD hh:mm:ss").format("DD/MM/YYYY"), 55, startY);
    startY += 5;
  }

  if (v.subBusinessName) {
    doc.text("Profession:", 10, startY);
    doc.text(v.subBusinessName, 55, startY);
    startY += 5;
  }

  if (v.othersBusinessName) {
    doc.text("Others:", 10, startY);
    doc.text(v.othersBusinessName, 55, startY);
    startY += 5;
  }

  if (v.pastLoan !== undefined) {
    doc.text("Existing Loan(s):", 10, startY);
    doc.text(v.pastLoan.toString(), 55, startY);
    startY += 5;
  }

  if (v.pastLoanAmount !== undefined) {
    doc.text("EMI", 10, startY);
    doc.text(v.pastLoanAmount.toString(), 55, startY);
    startY += 5;
  }

  doc.text("Permanent Address:", 10, startY);
  let startX = 55;
  let startYAddress = startY;
  const maxWidthAddress = 15;
  const lineHeightAddress = 5;

  let myAddress = ((v.companyAddress.address1 ? v.companyAddress.address1 + ", " : "")
    + (v.companyAddress.address2 ? v.companyAddress.address2 + ", " : "")
    + (v.companyAddress.landmark ? v.companyAddress.landmark + ", " : "")
    + (v.companyAddress.city ? v.companyAddress.city + ", " : "")
    + (v.companyAddress.state ? v.companyAddress.state + ", " : "")
    + (v.companyAddress.pincode ? v.companyAddress.pincode : ""));

  const words = myAddress.split(' ');
  let currentLine = '';

  for (const word of words) {
    const currentWidth = doc.getStringUnitWidth(currentLine + ' ' + word);
    if (currentWidth <= maxWidthAddress) {
      currentLine += (currentLine === '' ? '' : ' ') + word;
    } else {
      doc.text(currentLine, startX, startYAddress);
      startYAddress += lineHeightAddress;
      currentLine = word;
    }
  }
  doc.text(currentLine, startX, startYAddress);

  startY = startYAddress + 5;

  doc.text("Current Address:", 10, startY);
  let startXC = 55;
  let startYAddressC = startY;
  const maxWidthAddressC = 15;
  const lineHeightAddressC = 5;

  let myCurrentAddress = ((v.currentAddress.address1 ? v.currentAddress.address1 + ", " : "")
    + (v.currentAddress.address2 ? v.currentAddress.address2 + ", " : "")
    + (v.currentAddress.landmark ? v.currentAddress.landmark + ", " : "")
    + (v.currentAddress.city ? v.currentAddress.city + ", " : "")
    + (v.currentAddress.state ? v.currentAddress.state + ", " : "")
    + (v.currentAddress.pincode ? v.currentAddress.pincode : ""));

  const wordsC = myCurrentAddress.split(' ');
  let currentLineC = '';

  for (const wordC of wordsC) {
    const currentWidthC = doc.getStringUnitWidth(currentLineC + ' ' + wordC);
    if (currentWidthC <= maxWidthAddressC) {
      currentLineC += (currentLineC === '' ? '' : ' ') + wordC;
    } else {
      doc.text(currentLineC, startXC, startYAddressC);
      startYAddressC += lineHeightAddressC;
      currentLineC = wordC;
    }
  }
  doc.text(currentLineC, startXC, startYAddressC);

  startY = startYAddressC + 5;


  /********Employment Details************ */
  // Print employment details if any of the fields exist
  if (v.salariedCompInfo?.name || v.salariedCompInfo?.tenure || v.salariedCompInfo?.fixedSalary|| v.salariedCompInfo?.comapnyEmail || v.salariedCompInfo?.totalExp || v.salariedCompInfo?.workingAs || v.salariedCompInfo?.noticePeriod || v.salariedCompInfo?.salaryRecievedVia) {
    
    doc.setDrawColor(102, 153, 204);
    doc.setLineWidth(0.5);
    doc.line(10, startYpersonal, 200, startYpersonal);
    doc.setDrawColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');

    doc.text("Employment Details", 120, startYpersonal - 3);
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');

    let startY1 = startYpersonal;
    if (v.salariedCompInfo?.name) {
      doc.text("Company Name:", 120, startY1 + 5);
      let startXNameC1 = 165;
      let startYNameC1 = startY1 + 5;
      const maxWidthNameC1 = 10;
      const lineHeightNameC1 = 5;
      let myNameC1 = v.salariedCompInfo?.name ? v.salariedCompInfo?.name : "";
      const wordsNameC1 = myNameC1.split(' ');
      let currentLineNameC1 = '';

      for (const wordNameC1 of wordsNameC1) {
        const currentWidthNameC1 = doc.getStringUnitWidth(currentLineNameC1 + ' ' + wordNameC1);
        if (currentWidthNameC1 <= maxWidthNameC1) {
          currentLineNameC1 += (currentLineNameC1 === '' ? '' : ' ') + wordNameC1;
        } else {
          doc.text(currentLineNameC1, startXNameC1, startYNameC1);
          startYNameC1 += lineHeightNameC1;
          currentLineNameC1 = wordNameC1;
        }
      }
      doc.text(currentLineNameC1, startXNameC1, startYNameC1);
      
      startY1 = startYNameC1 - 5;
    }

    if (v.salariedCompInfo?.tenure) {
      doc.text("Tenure:", 120, startY1 + 10);
      doc.text(v.salariedCompInfo?.tenure, 165, startY1 + 10);
    }

    if (v.salariedCompInfo?.fixedSalary) {
      doc.text("Salary:", 120, startY1 + 15);
      doc.text(v.salariedCompInfo?.fixedSalary ? "Rs." + parseFloat(v.salariedCompInfo.fixedSalary).toLocaleString("en-IN", { maximumSignificantDigits: 3 }) : "", 165, startY1 + 15);
    }

    if ( v.salariedCompInfo?.comapnyEmail) {
      doc.text("Official Email ID:", 120, startY1 + 20);
      doc.text( v.salariedCompInfo?.comapnyEmail, 165, startY1 + 20);
      // startY += 5;
    }

    if (v.salariedCompInfo?.totalExp) {
      doc.text("Total Experience:", 120, startY1 + 25);
      doc.text(v.salariedCompInfo?.totalExp, 165, startY1 + 25);
    }

    if (v.salariedCompInfo?.workingAs) {
      doc.text("Working as:", 120, startY1 + 30);
      doc.text(v.salariedCompInfo?.workingAs, 165, startY1 + 30);
    }

    if (v.salariedCompInfo?.noticePeriod) {
      doc.text("Notice Period:", 120, startY1 + 35);
      doc.text(v.salariedCompInfo?.noticePeriod, 165, startY1 + 35);
    }

    if (v.salariedCompInfo?.salaryRecievedVia) {
      doc.text("Salary Recieved in:", 120, startY1 + 40);
      doc.text(v.salariedCompInfo?.salaryRecievedVia, 165, startY1 + 40);
    }
  }



    

  /********Bank details************/
  // Print Bank details only if bank details exist
  if (v.bankDetails?.length) {
    startY += 5;
    doc.setDrawColor(102, 153, 204);
    doc.setLineWidth(0.5);
    doc.line(10, startY, 200, startY);
    doc.setDrawColor(0, 0, 0);

    doc.setFontSize(13);
    doc.setFont(undefined, 'bold');
    doc.text("Bank details", 10, startY - 3);

    const bankHeaders = ["Account Holder Name", "Account Number", "IFSC", "Branch Address"];
    const datasBK = bdData;

    let xx = 10;
    const columnWidthsBK = [70, 50, 50, 55];
    const headerStyleBK = { fillColor: "#f3f5f5", textColor: "#292626" };
    const rowStyleBK = { fillColor: "#f2f2f2" };
    doc.setFontSize(12);
    bankHeaders.forEach((header, index) => {
      doc.setFillColor(headerStyleBK.fillColor);
      doc.setTextColor(headerStyleBK.textColor);
      doc.rect(xx, startY + 5, columnWidthsBK[index], 12, "D");
      doc.text(header, xx + columnWidthsBK[index] / 2, startY + 11, { align: 'center' });
      xx += columnWidthsBK[index];
    });

    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    xx = 10;
    let yy = startY + 17;

    datasBK.forEach((row) => {
      let lines = [];
      let lineHeight = 10;
      row.forEach((cell, index) => {
        doc.setFillColor(rowStyleBK.fillColor);
        doc.setTextColor(0, 0, 0);
        let cellHeight = lineHeight;
        if (bankHeaders[index] === "Account Holder Name") {
          let words = cell.split(' ');
          let currentLine = '';
          const maxWidthHolderName = 25;
          const lineHeightHolderName = 5;

          words.forEach((word) => {
            if ((doc.getStringUnitWidth(currentLine + ' ' + word) <= maxWidthHolderName)) {
              currentLine += (currentLine === '' ? '' : ' ') + word;
            } else {
              lines.push(currentLine);
              currentLine = word;
              lineHeight += lineHeightHolderName;
              cellHeight += lineHeightHolderName;
            }
          });

          if (currentLine !== '') {
            lines.push(currentLine);
          }

          lines.forEach((line, i) => {
            doc.text(line, xx + columnWidthsBK[index] / 2, yy + 6 + i * lineHeightHolderName, { align: 'center' });
          });
        } else {
          doc.text(cell.toString(), xx + columnWidthsBK[index] / 2, yy + 6, { align: 'center' });
        }
        doc.rect(xx, yy, columnWidthsBK[index], cellHeight, "D");
        xx += columnWidthsBK[index];
      });
      yy += lineHeight;
      xx = 10;
    });
  }



  // Save the PDF
  doc.output('save', v.caseNumber + '.pdf');
};

export default generateData;
