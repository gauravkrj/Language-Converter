
'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/Home.module.css';

const Home = () => {
  const [sourceLanguages, setSourceLanguages] = useState([]);
  const [targetLanguages, setTargetLanguages] = useState([]);
  const [sourceLanguage, setSourceLanguage] = useState('en');
  const [targetLanguage, setTargetLanguage] = useState('hi');
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [apiKey, setApiKey] = useState('a10185cff6mshfe1ff264c05ca57p112b86jsn686b2aeb8202');

  useEffect(() => {
    
    fetchLanguages();
    handleTranslate();
  }, []); 

  const fetchLanguages = async () => {
    try {
      const response = await axios.get(
        'https://translate-plus.p.rapidapi.com/',
        {
          headers: {
            'X-RapidAPI-Host': 'translate-plus.p.rapidapi.com',
            'X-RapidAPI-Key': apiKey,
          },
        }
      );

      const languages = response.data.supported_languages;
      console.log('Fetched languages:', languages);
      // Set the source and target languages
      const filteredLanguages = Object.entries(languages)
        .filter(([name, code]) => code !== 'auto')
        .map(([name, code]) => ({ name, code }));

      setSourceLanguages(filteredLanguages);
      setTargetLanguages(filteredLanguages);
    } catch (error) {
      console.error('Error fetching languages:', error.message);
    }
  };

  const handleTranslate = async () => {
    try {
      const options = {
        method: 'POST',
        url: 'https://translate-plus.p.rapidapi.com/translate',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Host': 'translate-plus.p.rapidapi.com',
          'X-RapidAPI-Key': apiKey,
        },
        data: {
          text: sourceText,
          source: sourceLanguage,
          target: targetLanguage,
        },
      };
  
      const response = await axios.request(options);
      console.log(response);
      
      const translation_text = response.data.translations.translation;
      setTranslatedText(translation_text);
    } catch (error) {
      console.error('Translation error:', error.message);
    }
  };
  

  const handleSourceTextChange = (e) => {
    const newText = e.target.value;
    setSourceText(newText);

    
    if (!newText.trim()) {
      setTranslatedText('');
    }
  };




  return (
    <div>
      <div className={styles.navbar}>
        <h1>Language Converter</h1>
      </div>

      <div className={styles.one}>
        <div className={styles.left}>
          <div className={styles.sourceText}>
            <textarea
              className={styles.textarea}
              placeholder='Enter Text here ..'
              id='sourceText'
              rows="25"
              cols="50"
              type="text"
              value={sourceText}
              onChange={handleSourceTextChange}
            />
          </div>
          <div>
            <select
              className={styles.select}
              value={sourceLanguage}
              onChange={(e) => setSourceLanguage(e.target.value)}
            >
              {sourceLanguages.map(lang => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.right}>
          <div>
            <textarea
              className={styles.textarea}
              placeholder='Your Translated text'
              id='targetText'
              rows="25"
              cols="50"
              type="text"
              value={translatedText}
              readOnly
            />
          </div>
          <div>
            <select
              className={styles.select}
              value={targetLanguage}
              onChange={(e) => setTargetLanguage(e.target.value)}
            >
              {targetLanguages.map(lang => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className={styles.two}>
        <button className={styles.button} onClick={handleTranslate}>
          Translate
        </button>
      </div>
    </div>
  );
};

export default Home;
