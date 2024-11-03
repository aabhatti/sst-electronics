import jsPDF from "jspdf";
import { toPng } from "html-to-image";
import { error } from "../alert";
import Button from "../button";

interface GeneratePDFProps {
  html: React.MutableRefObject<HTMLDivElement | null>;
  fileName: string | undefined;
}

const GeneratePDF: React.FC<GeneratePDFProps> = ({
  html,
  fileName = "file.pdf",
}) => {
  const handleGeneratePDF = async () => {
    const inputData = html?.current;
    if (!inputData) {
      error("Could not generate PDF: HTML content is missing.");
      return;
    }

    try {
      // Capture the content as a PNG image
      const image = await toPng(inputData, { quality: 0.95 });

      // Initialize jsPDF in landscape orientation
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: "a4",
      });

      // Get PDF dimensions
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // Add the image to the PDF at the calculated size
      pdf.addImage(image, "JPEG", 0, 0, pdfWidth, pdfHeight);
      //   pdf.addImage(image, "JPEG", 0, 0, imageWidth, imageHeight);
      pdf.save(fileName);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      error(errorMessage);
    }
  };

  return <Button onClick={handleGeneratePDF}>Download PDF</Button>;
};

export default GeneratePDF;
