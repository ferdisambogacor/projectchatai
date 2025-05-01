// Bagian tambahan dari daftar model OpenRouter gratis
const modelsPart4 = [
  {
    id: 'featherless/qwerky-72b:free',
    name: 'Qwerky-72B',
    category: 'XLarge',
    description: 'Model besar 72B parameter dengan persona unik',
    features: ['Ukuran besar', 'Penalaran yang kuat'],
    strengths: ['Respons kaya', 'Penalaran kompleks', 'Kreativitas'],
    weaknesses: ['Sangat lambat', 'Membutuhkan banyak sumber daya'],
    useCases: ['Chatbot kreatif', 'Penulisan konten', 'Tugas kreatif'],
    tokenLimit: 32000
  },
  {
    id: 'mistralai/mistral-small-3.1-24b-instruct:free',
    name: 'Mistral Small 3.1 24B',
    category: 'Large',
    description: 'Model Mistral 24B parameter seri 3.1',
    features: ['Arsitektur Mistral terbaru', 'Kualitas tinggi'],
    strengths: ['Output berkualitas tinggi', 'Penalaran yang baik'],
    weaknesses: ['Lebih lambat dari model kecil'],
    useCases: ['Tugas bahasa kompleks', 'Penalaran', 'Pemrograman'],
    tokenLimit: 32000
  },
  {
    id: 'open-r1/olympiccoder-32b:free',
    name: 'OlympicCoder-32B',
    category: 'Specialized',
    description: 'Model khusus 32B parameter untuk tugas pemrograman',
    features: ['Fokus pada kode', 'Pemahaman algoritma yang baik'],
    strengths: ['Coding superior', 'Pemahaman algoritma'],
    weaknesses: ['Kurang universal untuk tugas umum'],
    useCases: ['Pemrograman', 'Algoritma', 'Problem solving'],
    tokenLimit: 32000
  },
  {
    id: 'google/gemma-3-1b-it:free',
    name: 'Gemma-3-1B-IT',
    category: 'Mini',
    description: 'Model Google Gemma 3 dengan 1B parameter',
    features: ['Ringan', 'Efisien', 'Teknologi Google'],
    strengths: ['Sangat ringan', 'Respons cepat'],
    weaknesses: ['Kemampuan terbatas dibanding model besar'],
    useCases: ['Chat sederhana', 'Tugas dasar', 'Aplikasi ringan'],
    tokenLimit: 8000
  },
  {
    id: 'google/gemma-3-4b-it:free',
    name: 'Gemma-3-4B-IT',
    category: 'Small',
    description: 'Model Google Gemma 3 dengan 4B parameter',
    features: ['Keseimbangan ukuran-performa', 'Teknologi Google'],
    strengths: ['Efisien', 'Respons berkualitas untuk ukurannya'],
    weaknesses: ['Tidak sekuat model yang lebih besar'],
    useCases: ['Chat umum', 'Tugas sederhana', 'Aplikasi ringan'],
    tokenLimit: 16000
  },
  {
    id: 'google/gemma-3-12b-it:free',
    name: 'Gemma-3-12B-IT',
    category: 'Medium',
    description: 'Model Google Gemma 3 dengan 12B parameter',
    features: ['Ukuran menengah', 'Performa baik', 'Teknologi Google'],
    strengths: ['Keseimbangan performa-ukuran', 'Respons berkualitas'],
    weaknesses: ['Tidak sekuat model yang lebih besar'],
    useCases: ['Chat kompleks', 'Penalaran', 'Pemrograman'],
    tokenLimit: 32000
  },
  {
    id: 'rekaai/reka-flash-3:free',
    name: 'Reka Flash 3',
    category: 'Medium',
    description: 'Model responsif dengan fokus pada kecepatan',
    features: ['Respons cepat', 'Optimasi kecepatan'],
    strengths: ['Sangat responsif', 'Output berkualitas baik'],
    weaknesses: ['Tidak sekuat model yang lebih besar'],
    useCases: ['Chat real-time', 'Aplikasi responsif'],
    tokenLimit: 16000
  },
  {
    id: 'google/gemma-3-27b-it:free',
    name: 'Gemma-3-27B-IT',
    category: 'Large',
    description: 'Model Google Gemma 3 dengan 27B parameter',
    features: ['Model besar', 'Performa tinggi', 'Teknologi Google'],
    strengths: ['Penalaran kuat', 'Output berkualitas tinggi'],
    weaknesses: ['Lebih lambat dari model yang lebih kecil'],
    useCases: ['Penalaran kompleks', 'Pemrograman', 'Tugas bahasa kompleks'],
    tokenLimit: 32000
  },
  {
    id: 'qwen/qwq-32b:free',
    name: 'QWQ-32B',
    category: 'Large',
    description: 'Model QWQ dengan 32B parameter untuk tugas umum',
    features: ['Model besar', 'Kemampuan luas'],
    strengths: ['Penalaran kompleks', 'Output berkualitas tinggi'],
    weaknesses: ['Membutuhkan sumber daya besar'],
    useCases: ['Tugas bahasa kompleks', 'Riset', 'Pemrograman'],
    tokenLimit: 32000
  },
  {
    id: 'deepseek/deepseek-r1-zero:free',
    name: 'DeepSeek-R1-Zero',
    category: 'Large',
    description: 'Model DeepSeek R1 versi Zero untuk penalaran',
    features: ['Penalaran yang ditingkatkan', 'Kemampuan problem-solving'],
    strengths: ['Penalaran logis unggul', 'Pemahaman konteks yang baik'],
    weaknesses: ['Membutuhkan sumber daya besar'],
    useCases: ['Penalaran', 'Problem-solving', 'Logika'],
    tokenLimit: 32000
  }
];

const modelsPart5 = [
  {
    id: 'moonshotai/moonlight-16b-a3b-instruct:free',
    name: 'Moonlight-16B-A3B',
    category: 'Medium',
    description: 'Model Moonshot AI dengan 16B parameter dan instruksi A3B',
    features: ['Performa seimbang', 'Dioptimasi dengan teknik A3B'],
    strengths: ['Respons seimbang', 'Pemahaman instruksi baik'],
    weaknesses: ['Tidak sekuat model yang lebih besar'],
    useCases: ['Chat umum', 'Instruksi kompleks'],
    tokenLimit: 16000
  },
  {
    id: 'nousresearch/deephermes-3-llama-3-8b-preview:free',
    name: 'DeepHermes-3-Llama-3-8B',
    category: 'Medium',
    description: 'Model DeepHermes berbasis Llama-3 dengan 8B parameter',
    features: ['Arsitektur Llama-3', 'Optimasi DeepHermes'],
    strengths: ['Keseimbangan performa-ukuran', 'Efisien'],
    weaknesses: ['Tidak sekuat model yang lebih besar'],
    useCases: ['Chat umum', 'Tugas bahasa', 'Pemrograman sederhana'],
    tokenLimit: 16000
  },
  {
    id: 'cognitivecomputations/dolphin3.0-r1-mistral-24b:free',
    name: 'Dolphin 3.0 R1 Mistral-24B',
    category: 'Large',
    description: 'Model Dolphin berbasis Mistral dengan 24B parameter',
    features: ['Arsitektur Mistral', 'Training Dolphin'],
    strengths: ['Respons berkualitas tinggi', 'Penalaran yang baik'],
    weaknesses: ['Membutuhkan sumber daya besar'],
    useCases: ['Tugas bahasa kompleks', 'Pemrograman', 'Penalaran'],
    tokenLimit: 32000
  },
  {
    id: 'cognitivecomputations/dolphin3.0-mistral-24b:free',
    name: 'Dolphin 3.0 Mistral-24B',
    category: 'Large',
    description: 'Model Dolphin berbasis Mistral dengan 24B parameter',
    features: ['Arsitektur Mistral', 'Training Dolphin'],
    strengths: ['Respons berkualitas tinggi', 'Penalaran yang baik'],
    weaknesses: ['Membutuhkan sumber daya besar'],
    useCases: ['Tugas bahasa kompleks', 'Pemrograman', 'Penalaran'],
    tokenLimit: 32000
  },
  {
    id: 'qwen/qwen2.5-vl-72b-instruct:free',
    name: 'Qwen2.5-VL-72B-Instruct',
    category: 'Vision',
    description: 'Model vision-language Qwen dengan 72B parameter',
    features: ['Kemampuan multimodal', 'Ukuran sangat besar'],
    strengths: ['Analisis visual superior', 'Penalaran visual kompleks'],
    weaknesses: ['Sangat lambat', 'Membutuhkan sumber daya besar'],
    useCases: ['Analisis visual kompleks', 'Riset multimodal'],
    tokenLimit: 8000
  },
  {
    id: 'mistralai/mistral-small-24b-instruct-2501:free',
    name: 'Mistral Small 24B Instruct 2501',
    category: 'Large',
    description: 'Model Mistral Small dengan 24B parameter versi 2501',
    features: ['Arsitektur Mistral', 'Parameter 24B'],
    strengths: ['Output berkualitas tinggi', 'Penalaran kompleks'],
    weaknesses: ['Membutuhkan sumber daya besar'],
    useCases: ['Tugas bahasa kompleks', 'Penalaran', 'Pemrograman'],
    tokenLimit: 32000
  },
  {
    id: 'deepseek/deepseek-r1-distill-qwen-14b:free',
    name: 'DeepSeek-R1-Distill-Qwen-14B',
    category: 'Medium',
    description: 'Model DeepSeek R1 yang didistilasi dari Qwen 14B',
    features: ['Distilasi pengetahuan', '14B parameter'],
    strengths: ['Efisien untuk ukurannya', 'Kualitas output baik'],
    weaknesses: ['Tidak sekuat model asli yang lebih besar'],
    useCases: ['Tugas bahasa', 'Penalaran', 'Aplikasi pengetahuan'],
    tokenLimit: 16000
  },
  {
    id: 'deepseek/deepseek-r1-distill-llama-70b:free',
    name: 'DeepSeek-R1-Distill-Llama-70B',
    category: 'Large',
    description: 'Model DeepSeek R1 yang didistilasi dari Llama 70B',
    features: ['Distilasi dari model 70B', 'Efisiensi yang ditingkatkan'],
    strengths: ['Kualitas output bagus', 'Lebih efisien dari model 70B asli'],
    weaknesses: ['Tetap membutuhkan sumber daya signifikan'],
    useCases: ['Tugas bahasa kompleks', 'Penalaran', 'Aplikasi pengetahuan'],
    tokenLimit: 32000
  },
  {
    id: 'deepseek/deepseek-r1:free',
    name: 'DeepSeek-R1',
    category: 'Large',
    description: 'Model utama DeepSeek R1 untuk berbagai tugas',
    features: ['Arsitektur R1', 'Kemampuan penalaran unggul'],
    strengths: ['Penalaran kompleks', 'Output berkualitas tinggi'],
    weaknesses: ['Membutuhkan sumber daya besar'],
    useCases: ['Penalaran', 'Tugas bahasa kompleks', 'Research'],
    tokenLimit: 32000
  },
  {
    id: 'deepseek/deepseek-chat:free',
    name: 'DeepSeek-Chat',
    category: 'Large',
    description: 'Model DeepSeek yang dioptimalkan untuk percakapan',
    features: ['Optimasi dialog', 'Responsif dalam percakapan'],
    strengths: ['Interaksi alami', 'Pemahaman konteks dialog'],
    weaknesses: ['Membutuhkan sumber daya besar'],
    useCases: ['Chat', 'Asisten virtual', 'Customer support'],
    tokenLimit: 32000
  }
];

const modelsPart6 = [
  {
    id: 'google/gemini-2.0-flash-exp:free',
    name: 'Gemini 2.0 Flash Exp',
    category: 'Medium',
    description: 'Model Google Gemini 2.0 versi Flash yang lebih responsif',
    features: ['Kecepatan responsif', 'Teknologi Google'],
    strengths: ['Sangat cepat', 'Output berkualitas baik'],
    weaknesses: ['Tidak sekuat model Gemini Pro'],
    useCases: ['Chat real-time', 'Aplikasi responsif', 'Tugas umum'],
    tokenLimit: 16000
  },
  {
    id: 'meta-llama/llama-3.3-70b-instruct:free',
    name: 'Llama-3.3-70B-Instruct',
    category: 'XLarge',
    description: 'Model Llama 3.3 dengan 70B parameter dan instruksi',
    features: ['Arsitektur Llama 3.3 terbaru', 'Ukuran sangat besar'],
    strengths: ['Performa tingkat tinggi', 'Pemahaman konteks sangat baik'],
    weaknesses: ['Sangat lambat', 'Membutuhkan sumber daya sangat besar'],
    useCases: ['Penelitian kompleks', 'Tugas tingkat lanjut', 'Penalaran mendalam'],
    tokenLimit: 32000
  },
  {
    id: 'qwen/qwq-32b-preview:free',
    name: 'QWQ-32B-Preview',
    category: 'Large',
    description: 'Versi preview dari model QWQ 32B',
    features: ['Arsitektur terbaru', '32B parameter'],
    strengths: ['Performa tinggi', 'Respons berkualitas'],
    weaknesses: ['Membutuhkan sumber daya besar'],
    useCases: ['Tugas bahasa kompleks', 'Penelitian', 'Pemrograman'],
    tokenLimit: 32000
  },
  {
    id: 'google/learnlm-1.5-pro-experimental:free',
    name: 'LearnLM 1.5 Pro Experimental',
    category: 'Medium',
    description: 'Model eksperimental Google dengan fokus pada pembelajaran',
    features: ['Optimasi untuk konteks pembelajaran', 'Penjelasan yang baik'],
    strengths: ['Penjelasan konsep yang baik', 'Kemampuan pendidikan'],
    weaknesses: ['Masih eksperimental'],
    useCases: ['Edukasi', 'Penjelasan konsep', 'Tutorial'],
    tokenLimit: 16000
  },
  {
    id: 'qwen/qwen-2.5-coder-32b-instruct:free',
    name: 'Qwen-2.5-Coder-32B-Instruct',
    category: 'Specialized',
    description: 'Model Qwen 2.5 khusus untuk coding dengan 32B parameter',
    features: ['Fokus pada kode', '32B parameter'],
    strengths: ['Pemahaman kode superior', 'Penjelasan dan debugging kode'],
    weaknesses: ['Membutuhkan sumber daya besar'],
    useCases: ['Pemrograman', 'Code refactoring', 'Penjelasan kode'],
    tokenLimit: 32000
  },
  {
    id: 'qwen/qwen-2.5-7b-instruct:free',
    name: 'Qwen-2.5-7B-Instruct',
    category: 'Medium',
    description: 'Model Qwen 2.5 standar dengan 7B parameter',
    features: ['Arsitektur Qwen 2.5', '7B parameter'],
    strengths: ['Efisien', 'Keseimbangan performa-ukuran'],
    weaknesses: ['Tidak sekuat model yang lebih besar'],
    useCases: ['Chat umum', 'Tugas bahasa menengah'],
    tokenLimit: 16000
  },
  {
    id: 'meta-llama/llama-3.2-3b-instruct:free',
    name: 'Llama-3.2-3B-Instruct',
    category: 'Small',
    description: 'Model Llama 3.2 ringan dengan 3B parameter',
    features: ['Arsitektur Llama 3.2', 'Ukuran efisien'],
    strengths: ['Respons cepat', 'Efisien untuk ukurannya'],
    weaknesses: ['Kemampuan terbatas dibanding model besar'],
    useCases: ['Chat sederhana', 'Tugas bahasa dasar'],
    tokenLimit: 8000
  },
  {
    id: 'meta-llama/llama-3.2-1b-instruct:free',
    name: 'Llama-3.2-1B-Instruct',
    category: 'Mini',
    description: 'Model Llama 3.2 ultra-ringan dengan 1B parameter',
    features: ['Arsitektur Llama 3.2', 'Sangat efisien'],
    strengths: ['Sangat cepat', 'Hemat sumber daya'],
    weaknesses: ['Kemampuan sangat terbatas'],
    useCases: ['Chat dasar', 'Tugas sederhana', 'Perangkat terbatas'],
    tokenLimit: 4000
  },
  {
    id: 'meta-llama/llama-3.2-11b-vision-instruct:free',
    name: 'Llama-3.2-11B-Vision-Instruct',
    category: 'Vision',
    description: 'Model Llama 3.2 dengan 11B parameter dan kemampuan visual',
    features: ['Kemampuan multimodal', 'Pemahaman gambar'],
    strengths: ['Analisis gambar yang baik', 'Respons seimbang'],
    weaknesses: ['Tidak sekuat model VL yang lebih besar'],
    useCases: ['Analisis gambar', 'Tugas multimodal'],
    tokenLimit: 8000
  },
  {
    id: 'qwen/qwen-2.5-72b-instruct:free',
    name: 'Qwen-2.5-72B-Instruct',
    category: 'XLarge',
    description: 'Model Qwen 2.5 dengan 72B parameter untuk performa maksimal',
    features: ['Arsitektur Qwen 2.5', 'Ukuran sangat besar'],
    strengths: ['Performa superior', 'Output berkualitas tinggi'],
    weaknesses: ['Sangat lambat', 'Membutuhkan sumber daya besar'],
    useCases: ['Penelitian kompleks', 'Tugas tingkat lanjut'],
    tokenLimit: 32000
  }
];

module.exports = {
  modelsPart4,
  modelsPart5,
  modelsPart6
};
