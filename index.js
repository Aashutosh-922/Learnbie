const { Document, Packer, Paragraph, TextRun } = require("docx");

// Function to create a DOCX document
const createDocx = async () => {
  const doc = new Document();

  
  doc.addSection({
    properties: {},
    children: [
      new Paragraph({
        children: [
          new TextRun("This is a sample DOCX document created from React code."),
        ],
      }),
    ],
  });

  
  const buffer = await Packer.toBuffer(doc);
  return buffer;
};

// Function to download the DOCX document
const downloadDocx = async () => {
  
  const buffer = await createDocx();

  // Create a Blob from the buffer
  const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });

  // Create a URL for the Blob
  const url = URL.createObjectURL(blob);

  // Create a link element
  const link = document.createElement("a");

  // Set link attributes
  link.href = url;
  link.download = "document.docx";

  // Append the link to the document body
  document.body.appendChild(link);

  // Click the link to trigger the download
  link.click();

  // Remove the link from the document body
  document.body.removeChild(link);
};

// Get the download button element
const downloadButton = document.getElementById("downloadButton");

// Add click event listener to the download button
downloadButton.addEventListener("click", downloadDocx);
