// "use server";
// import { jsPDF } from "jspdf";

// function GeneratePDF() {
//   const handlePDF = async () => {
//     const doc = new jsPDF("p", "pt", "a4", false);
//     // do whatever you want in your pdf and finally save your pdf
//     await doc.save("mypdf.pdf");
//   };

//   return <button onClick={handlePDF}>Generate PDF</button>;
// }

// export async function handleGeneratePDF(id: string) {
//   try {
//     const url = AdminUrls.fetchUserDetails(id);
//     return await ExecuteHttpRequest({ method: METHODES.GET, url }, true);
//   } catch (error: any) {
//     throw new Error(error);
//   }
// }
