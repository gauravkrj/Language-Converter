'use client'
import { useState } from 'react';

const Translator = ({ translateText }) => {
  const [sourceText, setSourceText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('en'); // Default to English
  const [targetLanguage, setTargetLanguage] = useState('es'); // Default to Spanish
  const [translatedText, setTranslatedText] = useState('');

  const handleTranslate = async () => {
    try {
      const translation = await translateText(sourceText, sourceLanguage, targetLanguage);
      setTranslatedText(translation);
    } catch (error) {
      console.error('Translation error:', error.message);
    }
  };

  return (
    <div>
      <div>
        <label>
          Enter text:
          <input type="text" value={sourceText} onChange={(e) => setSourceText(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Select source language:
          <select value={sourceLanguage} onChange={(e) => setSourceLanguage(e.target.value)}>
            {/* Add language options dynamically */}
            <option value="en">English</option>
            <option value="es">Spanish</option>
            {/* Add more language options as needed */}
          </select>
        </label>
      </div>
      <div>
        <label>
          Select target language:
          <select value={targetLanguage} onChange={(e) => setTargetLanguage(e.target.value)}>
            {/* Add language options dynamically */}
            <option value="en">English</option>
            <option value="es">Spanish</option>
            {/* Add more language options as needed */}
          </select>
        </label>
      </div>
      <div>
        <button onClick={handleTranslate}>Translate</button>
      </div>
      <div>
        <label>
          Translated text:
          <input type="text" value={translatedText} readOnly />
        </label>
      </div>
    </div>
  );
};

export default Translator;
