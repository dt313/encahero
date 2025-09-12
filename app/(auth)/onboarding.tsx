import { Image } from 'react-native';

import { useRouter } from 'expo-router';

import OnboardingPage from 'react-native-onboarding-swiper';

function OnBroading() {
    const router = useRouter();
    return (
        <OnboardingPage
            onSkip={() => router.replace('/login')}
            onDone={() => router.replace('/login')}
            pages={[
                {
                    backgroundColor: '#fff',
                    image: (
                        <Image
                            source={{
                                uri: 'https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?q=80&w=3538&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                            }}
                            style={{ width: 200, height: 200 }}
                        />
                    ),
                    title: 'Learn English Easily',
                    subtitle: 'Practice vocabulary with flashcards and fun games every day!',
                },
                {
                    backgroundColor: '#f7f3fe',
                    image: (
                        <Image
                            source={{
                                uri: 'https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?q=80&w=3538&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                            }}
                            style={{ width: 200, height: 200 }}
                        />
                    ),
                    title: 'Track Your Progress',
                    subtitle: "Visualize your daily streaks and words you've mastered.",
                },
                {
                    backgroundColor: '#e4f1fe',
                    image: (
                        <Image
                            source={{
                                uri: 'https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?q=80&w=3538&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                            }}
                            style={{ width: 200, height: 200 }}
                        />
                    ),
                    title: 'Compete With Friends',
                    subtitle: 'Join battles and challenge friends to boost motivation and memory power!',
                },
            ]}
        />
    );
}

export default OnBroading;
