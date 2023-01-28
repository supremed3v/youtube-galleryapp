import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { useImageContext } from "../context/imageContext";

export default function Home() {
  const [imageTitle, setImageTitle] = useState("");
  const [images, setImages] = useState([]);
  const { addImages, success, error, loading, gallery } = useImageContext();

  const handleImageSelect = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      base64: true,
      allowsMultipleSelection: true,
      allowsEditing: false,
    });

    if (!result.canceled) {
      setImages(result.assets.map((image) => image.base64));
    }
  };

  const imagesArray = [];

  for (let i = 0; i < images.length; i++) {
    imagesArray.push(`data:image/jpg;base64,${images[i]}`);
  }

  console.log(images.length);
  //   console.log(uploadedImages);

  const submitHandler = () => {
    const data = {
      photos: imagesArray,
      titleOfGallery: imageTitle,
    };
    addImages(data);
    setImages([]);
  };

  if (loading === true) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <FlatList
      ListHeaderComponent={() => (
        <View style={[styles.container, { marginTop: 50 }]}>
          <Text style={styles.heading}>Home</Text>
          <TextInput
            value={imageTitle}
            onChangeText={(text) => setImageTitle(text)}
            style={{
              width: 150,
              borderColor: "black",
              borderWidth: 2,
              padding: 10,
              marginRight: 4,
              marginLeft: 4,
            }}
            placeholder="Enter image title"
          />
          {images.length === 0 ? (
            <TouchableOpacity
              style={{
                borderColor: "black",
                borderWidth: 2,
                borderRadius: 15,
                padding: 10,
                marginTop: 20,
              }}
              onPress={handleImageSelect}
            >
              <Text>Add Images</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                borderColor: "black",
                borderWidth: 2,
                borderRadius: 15,
                padding: 10,
                marginTop: 20,
              }}
              onPress={handleImageSelect}
            >
              <Text>Change Images</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={{
              borderColor: "black",
              borderWidth: 2,
              borderRadius: 15,
              padding: 10,
              marginTop: 20,
            }}
            onPress={submitHandler}
          >
            <Text>Upload</Text>
          </TouchableOpacity>
        </View>
      )}
      data={gallery}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <View style={[styles.container, { marginTop: 10 }]}>
          {item.images.map((image) => (
            <Image
              key={image.public_id}
              source={{ uri: image.url }}
              style={{ width: 200, height: 200 }}
            />
          ))}
        </View>
      )}
      ListEmptyComponent={() => (
        <View style={styles.container}>
          <Text>No images to display</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
});
