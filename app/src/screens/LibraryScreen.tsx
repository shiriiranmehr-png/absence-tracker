import React from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { AppHeader } from '../components/ui/AppHeader';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { EmptyState } from '../components/ui/EmptyState';
import { ScreenContainer } from '../components/ui/ScreenContainer';
import { SectionHeader } from '../components/ui/SectionHeader';
import { colors, radius, spacing, typography } from '../theme';
import { useVideoLibrary } from '../hooks/useVideoLibrary';

export function LibraryScreen() {
  const { videos } = useVideoLibrary();

  const downloadVideo = (contentBase64: string, fileName: string) => {
    if (typeof window === 'undefined') {
      Alert.alert('دانلود', 'برای دانلود ویدیو، نسخه وب برنامه را باز کنید.');
      return;
    }

    const link = document.createElement('a');
    link.href = `data:video/mp4;base64,${contentBase64}`;
    link.download = fileName;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <ScreenContainer style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <AppHeader
          title="Library"
          subtitle="ویدیوهایی که ساختی اینجا ذخیره می‌شوند و قابل دانلود هستند."
        />

        <SectionHeader title="کتابخانه ویدیو" hint="همه ویدیوهای ساخته‌شده به صورت کارت‌های گرید نمایش داده می‌شوند." />

        {videos.length === 0 ? (
          <View style={styles.emptyWrapper}>
            <EmptyState
              title="هنوز ویدیویی ساخته نشده"
              hint="یک ریلز بساز تا اینجا با کارت و امکان دانلود نمایش داده شود."
            />
          </View>
        ) : (
          <View style={styles.grid}>
            {videos.map((video) => (
              <Card key={video.id} style={styles.videoCard}>
                <Image source={{ uri: video.thumbnailUri }} style={styles.thumbnail} />
                <Text style={styles.videoTitle}>{video.title}</Text>
                <Text style={styles.videoMeta}>{new Date(video.createdAt).toLocaleString('fa-IR', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                })}</Text>
                <Text style={styles.videoMeta}>مدت: {video.duration} ثانیه</Text>
                <Button
                  title="دانلود"
                  onPress={() => downloadVideo(video.contentBase64, video.fileName)}
                  size="sm"
                />
              </Card>
            ))}
          </View>
        )}
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: 0,
  },
  container: {
    padding: spacing.lg,
    paddingBottom: 48,
  },
  emptyWrapper: {
    marginTop: spacing.xl,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  videoCard: {
    width: '48%',
    padding: spacing.sm,
    gap: spacing.sm,
  },
  thumbnail: {
    width: '100%',
    height: 140,
    borderRadius: radius.md,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  videoTitle: {
    color: colors.textPrimary,
    fontSize: typography.body,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  videoMeta: {
    color: colors.textSecondary,
    fontSize: typography.caption,
    marginBottom: spacing.xs,
  },
});
