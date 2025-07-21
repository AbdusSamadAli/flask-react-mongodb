import { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://127.0.0.1:5000/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage({ text: response.data.message, type: "success" });
    } catch (error) {
      console.error("Error uploading file:", error);
      setMessage({ text: "Upload failed", type: "error" });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Upload Image</h2>

        <label className="block w-full cursor-pointer border-dashed border-2 border-gray-300 p-6 rounded-lg text-gray-500 hover:bg-gray-100 transition">
          <input type="file" className="hidden" onChange={handleFileChange} />
          {preview ? (
            <img src={preview} alt="Preview" className="w-full h-40 object-cover rounded-md mb-2" />
          ) : (
            <span className="text-gray-400">Click to select an image</span>
          )}
        </label>

        <button
          onClick={handleUpload}
          className={`mt-4 w-full py-2 rounded-lg text-white transition ${
            isUploading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={isUploading}
        >
          {isUploading ? "Uploading..." : "Upload"}
        </button>

        {message && (
          <p className={`mt-4 text-sm font-semibold ${message.type === "success" ? "text-green-600" : "text-red-600"}`}>
            {message.text}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
