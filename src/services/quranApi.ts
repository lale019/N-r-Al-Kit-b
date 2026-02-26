import axios from 'axios';

const BASE_URL = 'https://api.quran.com/api/v4';

export const fetchChapters = async () => {
  const { data } = await axios.get(`${BASE_URL}/chapters?language=en`);
  return data.chapters;
};

export const fetchJuzs = async () => {
  const { data } = await axios.get(`${BASE_URL}/juzs`);
  return data.juzs;
};

export const fetchVersesByChapter = async (
  chapterId: number,
  translationId: number,
  reciterId: number,
  page: number = 1
) => {
  const { data } = await axios.get(
    `${BASE_URL}/verses/by_chapter/${chapterId}`,
    {
      params: {
        language: 'en',
        words: false,
        translations: translationId,
        audio: reciterId,
        fields: 'text_uthmani,text_indopak',
        page,
        per_page: 50, // Paginate to avoid huge payloads
      },
    }
  );
  return data;
};

export const fetchChapterInfo = async (chapterId: number) => {
  const { data } = await axios.get(`${BASE_URL}/chapters/${chapterId}?language=en`);
  return data.chapter;
};

export const fetchAudioByChapter = async (chapterId: number, reciterId: number) => {
  const { data } = await axios.get(`${BASE_URL}/chapter_recitations/${reciterId}/${chapterId}`);
  return data.audio_file;
};
