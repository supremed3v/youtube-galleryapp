import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [gallery, setGallery] = useState([]);
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
      allowsEditing: false,
      base64: true,
    });
    if (!result.canceled) {
      setImages(result.assets.map((item) => item.base64));
    }
  };

  if (loading) {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        <Text>Loading...</Text>
      </View>
    );
  }

  const imagesArray = [];

  for (let i = 0; i < images.length; i++) {
    imagesArray.push(`data:image/jpg;base64,${images[i]}`);
  }

  const handleSubmit = () => {
    const data = {
      images: imagesArray,
      title,
    };
    uploadGallery(data);
    setImages([]);
  };

  const API = "http://192.168.18.3:5000/api/v1/upload";

  const uploadGallery = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post(API, data);
      setLoading(false);
      console.log(res.data.imageGallery.images);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getGalleries = async () => {
    try {
      const res = await axios.get("http://192.168.18.3:5000/api/v1/gallery");
      setGallery(res.data.gallery);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGalleries();
  }, []);

  return (
    <FlatList
      ListHeaderComponent={() => (
        <View style={[styles.container, { marginTop: 40 }]}>
          <Text>Upload Images</Text>
          <View>
            <TextInput
              value={title}
              onChangeText={(text) => setTitle(text)}
              placeholder="Enter image title"
              style={{
                padding: 10,
                borderColor: "black",
                borderWidth: 2,
                marginTop: 20,
              }}
            />
            <TouchableOpacity
              style={{
                borderWidth: 2,
                padding: 10,
                borderColor: "black",
                borderRadius: 10,
                marginTop: 20,
              }}
              onPress={selectImage}
            >
              <Text>Upload Images</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                borderWidth: 2,
                padding: 10,
                borderColor: "black",
                borderRadius: 10,
                marginTop: 20,
              }}
              onPress={handleSubmit}
              disabled={images.length === 0}
            >
              <Text>Upload</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      data={gallery}
      renderItem={({ item }) => (
        <View>
          <Text>{item.titleOfGallery}</Text>
          {item.images.map((image) => (
            <Image
              source={{ uri: image.url }}
              key={image.public_id}
              style={{
                width: 200,
                height: 200,
              }}
            />
          ))}
        </View>
      )}
      keyExtractor={(item) => item._id}
      ListEmptyComponent={() => <Text>Please Upload Images</Text>}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
