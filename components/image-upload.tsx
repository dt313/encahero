import React, { useEffect, useState } from 'react';

import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import * as ImagePicker from 'expo-image-picker';

import { Cancel01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { ThemedText } from '@/components/ThemedText';

const LIMIT_IMAGES = 3;
export default function ImageUpload({ onChangeImages }: { onChangeImages?: (imgs: string[]) => void }) {
    const [images, setImages] = useState<string[]>([]);
    const [isShowUpload, setIsShowUpload] = useState<boolean>(false);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsMultipleSelection: true,
            aspect: [4, 3],
            quality: 0,
            selectionLimit: 3 - images.length,
        });

        if (!result.canceled) {
            const uris = result.assets.map((asset) => asset.uri);
            updateImages([...images, ...uris]);
        }
    };

    const updateImages = (newImages: string[]) => {
        setImages(newImages);
        onChangeImages?.(newImages); // <-- gọi ngược lên
    };

    useEffect(() => {
        if (images.length >= LIMIT_IMAGES) {
            setIsShowUpload(false);
        } else {
            setIsShowUpload(true);
        }
    }, [images]);

    const handleRemoveImage = (uri: string) => {
        const newImages = images.filter((i) => i !== uri);
        updateImages(newImages);
    };

    return (
        <View style={styles.container}>
            <ScrollView horizontal style={{ marginBottom: 16 }}>
                {images.map((uri, index) => (
                    <View style={{ margin: 12 }} key={index}>
                        <Image source={{ uri }} style={styles.preview} />
                        <TouchableOpacity style={styles.calcelbtn} onPress={() => handleRemoveImage(uri)}>
                            <HugeiconsIcon icon={Cancel01Icon} size={16} color="#fff" />
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>

            {isShowUpload && (
                <View style={styles.upload}>
                    <ThemedText style={styles.infoText}>10.0 MB maximum file size</ThemedText>

                    <TouchableOpacity style={styles.button} onPress={pickImage}>
                        <ThemedText style={styles.buttonText}>Upload image</ThemedText>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { margin: 16 },
    preview: { width: 100, height: 100, borderRadius: 12 },
    upload: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderStyle: 'dashed',
        borderRadius: 12,
        padding: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoText: { fontSize: 14, color: '#888', marginBottom: 12 },
    button: {
        borderWidth: 1,
        borderColor: '#1E90FF',
        borderRadius: 8,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    buttonText: { color: '#1E90FF', fontSize: 16, fontWeight: '600' },

    calcelbtn: {
        position: 'absolute',
        top: -8,
        right: -8,
        backgroundColor: '#333',
        borderRadius: 40,
        padding: 4,
    },
});
