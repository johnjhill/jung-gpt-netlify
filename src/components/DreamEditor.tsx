import { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Loader2 } from 'lucide-react';

interface DreamEditorProps {
  onSubmit: (content: string) => void;
}

export const DreamEditor = ({ onSubmit }: DreamEditorProps) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const editor = useEditor({
    extensions: [StarterKit],
    content: '',
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl max-w-none focus:outline-none',
      },
    },
  });

  const handleSubmit = async () => {
    if (editor && editor.getText().trim()) {
      setIsAnalyzing(true);
      try {
        await onSubmit(editor.getText());
      } finally {
        setIsAnalyzing(false);
      }
    }
  };

  return (
    <Card className="p-6 bg-white/80 backdrop-blur-sm shadow-lg">
      <div className="mb-4">
        <h2 className="text-2xl font-serif text-dream-purple mb-2">Record Your Dream</h2>
        <p className="text-gray-600 mb-4">Write down your dream in as much detail as you remember...</p>
      </div>
      <div className="min-h-[200px] mb-4 p-4 border rounded-md bg-white">
        <EditorContent editor={editor} />
      </div>
      <Button 
        onClick={handleSubmit}
        className="w-full bg-dream-purple hover:bg-dream-purple/90 text-white"
        disabled={isAnalyzing}
      >
        {isAnalyzing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Analyzing Dream...
          </>
        ) : (
          'Analyze Dream'
        )}
      </Button>
    </Card>
  );
};