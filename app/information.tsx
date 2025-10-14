import { useMemo } from 'react';

import { Image, Keyboard, StyleSheet, TouchableOpacity, View } from 'react-native';

import * as ImagePicker from 'expo-image-picker';

import getAvatarOfUser from '@/helper/get-avatar-of-user';
import { updateUser } from '@/store/action/auth-action';
import { RootState } from '@/store/reducers';
import { ImageUploadIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { ThemedText } from '@/components/ThemedText';
import Button from '@/components/button';
import HeaderWithBack from '@/components/header-with-back';
import Input from '@/components/input';
import SafeArea from '@/components/safe-area';
import ScreenWrapper from '@/components/screen-wrapper';

import { useThemeColor } from '@/hooks/useThemeColor';
import useToast from '@/hooks/useToast';

import { userService } from '@/services';

type FormValues = {
    firstName: string;
    lastName: string;
    avatar: string;
    username: string;
};

function Information() {
    const user = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch();
    const { showErrorToast, showSuccessToast } = useToast();
    const displayAvatar = useMemo(() => {
        return getAvatarOfUser(user.avatar);
    }, [user]);
    const {
        control,
        watch,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: {
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            avatar: displayAvatar || '',
            username: user.username || '',
        },
        mode: 'onChange', // validate realtime
    });

    const textColor = useThemeColor({}, 'text');
    const avatar = watch('avatar');
    const pickAvatar = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.7,
        });

        if (!result.canceled) {
            setValue('avatar', result.assets[0].uri);
        }
    };

    const handleSave = async (data: FormValues) => {
        const formData = new FormData();

        if (data.avatar && data.avatar.startsWith('file://')) {
            formData.append('avatar', {
                uri: data.avatar,
                type: 'image/jpeg',
                name: `${user.username}-avatar.jpg`,
            } as any);
        }

        formData.append('firstName', data.firstName);
        formData.append('lastName', data.lastName);
        formData.append('username', data.username);

        try {
            // Gọi API update profile
            const res = await userService.updateProfile(user.id, formData);

            if (res) {
                dispatch(updateUser(res));
                showSuccessToast('Update user successfully');
                Keyboard.dismiss();
            }
        } catch (error) {
            showErrorToast(error);
        }
    };

    const black = useThemeColor({}, 'black');
    const white = useThemeColor({}, 'white');

    return (
        <ScreenWrapper>
            <SafeArea style={{ flex: 1, paddingHorizontal: 12 }}>
                <HeaderWithBack title="Personal Information" />
                <View style={styles.info}>
                    <TouchableOpacity onPress={pickAvatar} style={styles.avatarWrapper}>
                        {avatar ? (
                            <View style={{ position: 'relative' }}>
                                <Image source={{ uri: avatar }} style={[styles.avatar]} />
                                <View style={[styles.uploadIcon, { backgroundColor: white, borderColor: black }]}>
                                    <HugeiconsIcon icon={ImageUploadIcon} color={black} size={20} />
                                </View>
                            </View>
                        ) : (
                            <View style={[styles.avatarPlaceholder, { borderColor: textColor }]}>
                                <ThemedText style={{ color: textColor }}>Pick Avatar</ThemedText>
                            </View>
                        )}
                    </TouchableOpacity>

                    {/* Inputs */}
                    <View style={styles.inputGroup}>
                        <View style={styles.row}>
                            <Controller
                                control={control}
                                name="firstName"
                                rules={{
                                    required: 'First Name is required',
                                    minLength: {
                                        value: 2,
                                        message: 'First Name must be at least 2 characters',
                                    },
                                    maxLength: {
                                        value: 10,
                                        message: 'First Name cannot exceed 10 characters',
                                    },
                                    pattern: {
                                        value: /^[A-Za-z]+$/, // chỉ cho phép chữ cái
                                        message: 'First Name can only contain letters',
                                    },
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <Input
                                        containerStyle={styles.halfInput}
                                        label="First Name"
                                        value={value}
                                        placeholder="John"
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        errorMessage={errors.firstName?.message}
                                    />
                                )}
                            />
                            <Controller
                                control={control}
                                name="lastName"
                                rules={{
                                    required: 'Last Name is required',
                                    minLength: {
                                        value: 2,
                                        message: 'Last Name must be at least 2 characters',
                                    },
                                    maxLength: {
                                        value: 10,
                                        message: 'Last Name cannot exceed 10 characters',
                                    },
                                    pattern: {
                                        value: /^[A-Za-z]+$/, // chỉ cho phép chữ cái
                                        message: 'Last Name can only contain letters',
                                    },
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <Input
                                        containerStyle={styles.halfInput}
                                        label="Last Name"
                                        value={value}
                                        placeholder="David"
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        errorMessage={errors.lastName?.message}
                                    />
                                )}
                            />
                        </View>
                        <Controller
                            control={control}
                            name="username"
                            rules={{
                                required: 'Username is required',
                                minLength: {
                                    value: 6,
                                    message: 'Username must be at least 6 characters',
                                },
                                maxLength: {
                                    value: 15,
                                    message: 'Username cannot exceed 15 characters',
                                },
                                pattern: {
                                    value: /^[a-z0-9_]+$/,
                                    message: 'Username can only contain lowercase letters, numbers, and underscores',
                                },
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Input
                                    label="Username"
                                    value={value}
                                    placeholder="abc123"
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    errorMessage={errors.username?.message}
                                />
                            )}
                        />
                    </View>

                    {/* Buttons */}
                    <View style={styles.buttonRow}>
                        <Button type="default" buttonStyle={{ flex: 1 }} onPress={handleSubmit(handleSave)}>
                            Save
                        </Button>
                    </View>
                </View>
            </SafeArea>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    info: {
        flex: 1,
    },

    avatarWrapper: {
        alignItems: 'center',
        marginTop: 12,
        marginBottom: 24,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    avatarPlaceholder: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },

    row: {
        flexDirection: 'row',
        gap: 8,
    },
    halfInput: {
        flex: 1,
    },

    inputGroup: {
        gap: 12,
        marginTop: 12,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 24,
    },
    cancelButton: {
        backgroundColor: 'transparent',
        borderWidth: 1.5,
        borderColor: '#ccc',
        width: '48%',
    },

    uploadIcon: {
        position: 'absolute',
        bottom: -2,
        right: -2,
        padding: 6,
        borderRadius: 20,
        borderWidth: 1,
    },
});

export default Information;
