import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";

const ImageContext = createContext();

const initialState = {
  success: null,
  images: [],
  loading: false,
  error: null,
  uploadedImages: null,
  gallery: [],
};

export const API = "http://192.168.18.3:5000";

export const ImageProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  const addImages = async (data) => {
    setState({
      ...state,
      loading: true,
    });
    try {
      const res = await axios.post(`${API}/api/v1/upload`, data);
      setState({
        ...state,
        loading: false,
        success: res.data.success,
        uploadedImages: res.data.imageGallery,
      });
    } catch (error) {
      setState({
        ...state,
        loading: false,
        success: error.response.data.success,
        error: error.response.data.message,
      });
    }
  };

  const clearError = () => {
    setState({
      ...state,
      error: null,
    });
  };

  const getGallery = async () => {
    setState({
      ...state,
      loading: true,
    });
    try {
      const res = await axios.get(`${API}/api/v1/gallery`);
      setState({
        ...state,
        loading: false,
        success: res.data.success,
        gallery: res.data.gallery,
      });
    } catch (error) {
      setState({
        ...state,
        loading: false,
        error: error.response.data.message,
      });
    }
  };

  useEffect(() => {
    getGallery();
  }, []);

  return (
    <ImageContext.Provider value={{ ...state, addImages, clearError }}>
      {children}
    </ImageContext.Provider>
  );
};

export const useImageContext = () => useContext(ImageContext);
