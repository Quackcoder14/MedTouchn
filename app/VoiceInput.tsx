"use client";

import { useState, useEffect } from "react";

interface VoiceInputProps {
  onTranscript: (text: string) => void;
  language: string;
  isListening: boolean;
  setIsListening: (listening: boolean) => void;
}

export default function VoiceInput({ onTranscript, language, isListening, setIsListening }: VoiceInputProps) {
  const [transcript, setTranscript] = useState("");

  useEffect(() => {
    // Check if browser supports speech recognition
    if (typeof window === 'undefined') return;
    
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      console.warn("Speech recognition not supported");
      return;
    }

    const recognition = new SpeechRecognition();
    
    // Map language codes to speech recognition locales
    const languageMap: { [key: string]: string } = {
      en: 'en-US',
      es: 'es-ES',
      hi: 'hi-IN',
      fr: 'fr-FR',
      zh: 'zh-CN',
    };
    
    recognition.lang = languageMap[language] || 'en-US';
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event: any) => {
      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' ';
        } else {
          interimTranscript += transcript;
        }
      }

      if (finalTranscript) {
        setTranscript(finalTranscript);
        onTranscript(finalTranscript);
      } else {
        setTranscript(interimTranscript);
      }
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      if (isListening) {
        recognition.start(); // Restart if still supposed to be listening
      }
    };

    if (isListening) {
      try {
        recognition.start();
      } catch (error) {
        console.error('Error starting recognition:', error);
      }
    } else {
      recognition.stop();
    }

    return () => {
      recognition.stop();
    };
  }, [isListening, language, onTranscript, setIsListening]);

  return (
    <div className="bg-powder-blue/10 border-2 border-powder-blue rounded-xl p-4 min-h-[100px]">
      {isListening && (
        <div className="flex items-center gap-3 mb-3">
          <div className="flex gap-1">
            <div className="w-2 h-8 bg-powder-blue animate-pulse" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-8 bg-powder-blue animate-pulse" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-8 bg-powder-blue animate-pulse" style={{ animationDelay: '300ms' }}></div>
          </div>
          <span className="text-navy-deep font-medium">Listening...</span>
        </div>
      )}
      
      {transcript && (
        <p className="text-charcoal-gray text-sm">
          <strong>Detected:</strong> {transcript}
        </p>
      )}
      
      {!isListening && !transcript && (
        <p className="text-gray-400 text-sm text-center py-6">
          Click the microphone button to start voice input
        </p>
      )}
    </div>
  );
}
