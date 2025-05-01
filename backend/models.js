// Daftar model-model AI gratis dari OpenRouter dengan metadata
const models = [
  {
    id: 'qwen/qwen3-0.6b-04-28:free',
    name: 'Qwen3-0.6B',
    category: 'Mini',
    description: 'Model AI mini dengan 0.6B parameter, cocok untuk tugas-tugas dasar',
    features: ['Mendukung konteks 32K token', 'Arsitektur dual-mode', 'Mendukung multibahasa'],
    strengths: ['Sangat ringan', 'Respons cepat', 'Hemat sumber daya'],
    weaknesses: ['Kemampuan penalaran terbatas', 'Pengetahuan umum terbatas'],
    useCases: ['Chat umum', 'Tugas bahasa sederhana', 'Aplikasi ringan'],
    tokenLimit: 32000
  },
  {
    id: 'qwen/qwen3-1.7b:free',
    name: 'Qwen3-1.7B',
    category: 'Mini',
    description: 'Model AI ringan dengan 1.7B parameter, peningkatan dari Qwen3-0.6B',
    features: ['Mendukung konteks panjang', 'Performa lebih baik dari versi 0.6B'],
    strengths: ['Ringan', 'Respons cepat', 'Lebih baik dalam penalaran dasar'],
    weaknesses: ['Masih terbatas untuk tugas kompleks'],
    useCases: ['Chat umum', 'Pertanyaan dan jawaban', 'Tugas bahasa menengah'],
    tokenLimit: 32000
  },
  {
    id: 'qwen/qwen3-4b:free',
    name: 'Qwen3-4B',
    category: 'Small',
    description: 'Model 4B parameter dengan keseimbangan performa dan ukuran',
    features: ['Mendukung penalaran yang lebih baik', 'Konteks panjang'],
    strengths: ['Keseimbangan performa dan ukuran', 'Penanganan konteks lebih baik'],
    weaknesses: ['Lebih lambat dari model mini'],
    useCases: ['Chat umum', 'Coding sederhana', 'Tugas bahasa kompleks'],
    tokenLimit: 32000
  },
  {
    id: 'opengvlab/internvl3-14b:free',
    name: 'InternVL3-14B',
    category: 'Vision',
    description: 'Model multimodal yang menangani teks dan gambar',
    features: ['Kemampuan vision', 'Analisis gambar dan teks'],
    strengths: ['Analisis gambar baik', 'Penjelasan visual yang bagus'],
    weaknesses: ['Lebih lambat untuk tugas bahasa murni'],
    useCases: ['Analisis gambar', 'Deskripsi visual', 'Tugas multimodal'],
    tokenLimit: 8000
  },
  {
    id: 'deepseek/deepseek-prover-v2:free',
    name: 'DeepSeek Prover V2',
    category: 'Specialized',
    description: 'Model AI khusus untuk pembuktian matematis dan penalaran formal',
    features: ['Penalaran logis', 'Pembuktian matematis'],
    strengths: ['Sangat baik untuk matematika', 'Penalaran logis unggul'],
    weaknesses: ['Terbatas pada domain khusus'],
    useCases: ['Pembuktian matematis', 'Penalaran logis', 'Pendidikan STEM'],
    tokenLimit: 16000
  },
  {
    id: 'qwen/qwen3-30b-a3b:free',
    name: 'Qwen3-30B-A3B',
    category: 'Large',
    description: 'Model besar dengan 30B parameter untuk tugas penalaran tingkat tinggi',
    features: ['Penalaran unggul', 'Pemahaman konteks detail'],
    strengths: ['Penalaran kompleks', 'Pemahaman luas', 'Output berkualitas tinggi'],
    weaknesses: ['Lebih lambat', 'Lebih banyak menggunakan sumber daya'],
    useCases: ['Penalaran kompleks', 'Writing yang lebih baik', 'Analisis mendalam'],
    tokenLimit: 32000
  },
  {
    id: 'qwen/qwen3-8b:free',
    name: 'Qwen3-8B',
    category: 'Medium',
    description: 'Model menengah yang menawarkan keseimbangan performa dan kecepatan',
    features: ['Keseimbangan performa dan ukuran', 'Kemampuan multibahasa'],
    strengths: ['Efisien untuk sebagian besar tugas', 'Respons cepat'],
    weaknesses: ['Kalah performa dari model yang lebih besar'],
    useCases: ['Chat umum', 'Tugas bahasa kompleks', 'Pemrograman'],
    tokenLimit: 32000
  },
  {
    id: 'qwen/qwen3-14b:free',
    name: 'Qwen3-14B',
    category: 'Medium',
    description: 'Model 14B parameter dengan kemampuan penalaran yang kuat',
    features: ['Penalaran tingkat tinggi', 'Konteks panjang'],
    strengths: ['Penalaran unggul', 'Pemahaman semantik yang baik'],
    weaknesses: ['Lebih lambat dari model yang lebih kecil'],
    useCases: ['Penalaran kompleks', 'Coding', 'Penjelasan detail'],
    tokenLimit: 32000
  },
  {
    id: 'qwen/qwen3-32b:free',
    name: 'Qwen3-32B',
    category: 'Large',
    description: 'Model besar dengan 32B parameter untuk tugas kompleks',
    features: ['Kualitas respons tinggi', 'Penalaran kompleks'],
    strengths: ['Sangat baik dalam pemahaman kompleks', 'Output berkualitas tinggi'],
    weaknesses: ['Lebih lambat', 'Resource-intensive'],
    useCases: ['Research', 'Penalaran kompleks', 'Penulisan konten'],
    tokenLimit: 32000
  },
  {
    id: 'qwen/qwen3-235b-a22b:free',
    name: 'Qwen3-235B-A22B',
    category: 'XLarge',
    description: 'Model ekstra besar untuk performa maksimal dalam berbagai tugas',
    features: ['Kemampuan komprehensif', 'Kualitas respons tertinggi'],
    strengths: ['Performa superior', 'Penalaran sangat baik', 'Pemahaman nuansa'],
    weaknesses: ['Sangat lambat', 'Resource-intensive'],
    useCases: ['Tugas yang membutuhkan kualitas maksimal', 'Penelitian', 'Penalaran kompleks'],
    tokenLimit: 32000
  }
];

// Menambahkan 10 model lagi dari daftar
const modelsPartTwo = [
  {
    id: 'tngtech/deepseek-r1t-chimera:free',
    name: 'DeepSeek R1T Chimera',
    category: 'Specialized',
    description: 'Model khusus untuk penalaran dan tugas teknis',
    features: ['Fokus pada penalaran teknis', 'Konstruksi solusi kompleks'],
    strengths: ['Kemampuan teknis tinggi', 'Penalaran terstruktur'],
    weaknesses: ['Kurang universal untuk tugas umum'],
    useCases: ['Pemrograman', 'Penalaran teknis', 'Matematika'],
    tokenLimit: 16000
  },
  {
    id: 'thudm/glm-z1-9b:free',
    name: 'GLM-Z1-9B',
    category: 'Medium',
    description: 'Model GLM tahap lanjut dengan 9B parameter',
    features: ['Kemampuan multibahasa', 'Pemahaman konteks baik'],
    strengths: ['Kinerja seimbang', 'Respons berkualitas'],
    weaknesses: ['Tidak sekuat model yang lebih besar'],
    useCases: ['Chat umum', 'Pembuatan konten', 'Tugas bahasa kompleks'],
    tokenLimit: 16000
  },
  {
    id: 'thudm/glm-4-9b:free',
    name: 'GLM-4-9B',
    category: 'Medium',
    description: 'Model seri GLM-4 dengan 9B parameter',
    features: ['Arsitektur GLM-4 yang ditingkatkan', 'Pemahaman konteks baik'],
    strengths: ['Respons berkualitas', 'Performa seimbang'],
    weaknesses: ['Respons bisa lebih lambat dari model kecil'],
    useCases: ['Chat umum', 'Tugas bahasa kompleks', 'Penjelasan'],
    tokenLimit: 16000
  },
  {
    id: 'microsoft/mai-ds-r1:free',
    name: 'Microsoft MAI-DS-R1',
    category: 'Specialized',
    description: 'Model Microsoft AI untuk analisis data dan statistik',
    features: ['Fokus pada analisis data', 'Pemahaman konsep statistik'],
    strengths: ['Unggul dalam domain data science', 'Penjelasan statistik baik'],
    weaknesses: ['Khusus domain tertentu'],
    useCases: ['Data Science', 'Analisis statistik', 'Visualisasi data'],
    tokenLimit: 8000
  },
  {
    id: 'thudm/glm-z1-32b:free',
    name: 'GLM-Z1-32B',
    category: 'Large',
    description: 'Model GLM tahap lanjut dengan 32B parameter',
    features: ['Pemahaman konteks mendalam', 'Respons berkualitas tinggi'],
    strengths: ['Penalaran kompleks', 'Respons nuansa', 'Pemahaman luas'],
    weaknesses: ['Lambat', 'Resource-intensive'],
    useCases: ['Penalaran kompleks', 'Penelitian', 'Pemrograman kompleks'],
    tokenLimit: 16000
  },
  {
    id: 'thudm/glm-4-32b:free',
    name: 'GLM-4-32B',
    category: 'Large',
    description: 'Model seri GLM-4 dengan 32B parameter',
    features: ['Arsitektur GLM-4 yang ditingkatkan', 'Respons berkualitas tinggi'],
    strengths: ['Respons lengkap', 'Pemahaman luas', 'Penalaran kuat'],
    weaknesses: ['Lambat', 'Membutuhkan banyak sumber daya'],
    useCases: ['Riset kompleks', 'Pemrograman', 'Penulisan konten panjang'],
    tokenLimit: 16000
  },
  {
    id: 'shisa-ai/shisa-v2-llama3.3-70b:free',
    name: 'Shisa V2 Llama-3.3-70B',
    category: 'XLarge',
    description: 'Model berbasis Llama 3.3 dengan 70B parameter',
    features: ['Arsitektur Llama 3.3', 'Performa tingkat tinggi'],
    strengths: ['Performa tinggi', 'Pemahaman nuansa', 'Kesadaran konteks tinggi'],
    weaknesses: ['Sangat lambat', 'Membutuhkan banyak sumber daya'],
    useCases: ['Chat lanjutan', 'Riset', 'Tugas kompleks'],
    tokenLimit: 32000
  },
  {
    id: 'arliai/qwq-32b-arliai-rpr-v1:free',
    name: 'QWQ-32B-ArlAI-RPR-V1',
    category: 'Large',
    description: 'Model ArlAI berbasis QWQ dengan 32B parameter',
    features: ['Arsitektur RPR khusus', 'Performa tinggi'],
    strengths: ['Respons kompleks berkualitas', 'Penalaran baik'],
    weaknesses: ['Membutuhkan sumber daya besar'],
    useCases: ['Pemrograman kompleks', 'Penelitian', 'Tugas analitis'],
    tokenLimit: 32000
  },
  {
    id: 'agentica-org/deepcoder-14b-preview:free',
    name: 'DeepCoder-14B-Preview',
    category: 'Specialized',
    description: 'Model khusus untuk tugas pengkodean dan pemrograman',
    features: ['Fokus pada pemrograman', 'Pemahaman kode yang baik'],
    strengths: ['Pemahaman kode superior', 'Penjelasan kode yang jelas'],
    weaknesses: ['Kurang universal untuk tugas umum'],
    useCases: ['Pemrograman', 'Debugging', 'Pembelajaran kode'],
    tokenLimit: 16000
  },
  {
    id: 'moonshotai/kimi-vl-a3b-thinking:free',
    name: 'KIMI-VL-A3B-Thinking',
    category: 'Vision',
    description: 'Model multimodal dengan kemampuan pemrosesan visual',
    features: ['Kemampuan visual', 'Mode "thinking" untuk penalaran'],
    strengths: ['Analisis gambar yang baik', 'Penalaran visual'],
    weaknesses: ['Tidak sebaik model teks-saja untuk tugas bahasa murni'],
    useCases: ['Analisis gambar', 'Visual reasoning', 'Tugas multimodal'],
    tokenLimit: 8000
  }
];

// Menambahkan 10 model lainnya
const modelsPartThree = [
  {
    id: 'nvidia/llama-3.3-nemotron-super-49b-v1:free',
    name: 'Llama-3.3-Nemotron-Super-49B',
    category: 'XLarge',
    description: 'Model Nvidia berbasis Llama 3.3 dengan 49B parameter',
    features: ['Pengembangan oleh NVIDIA', 'Performa tingkat tinggi'],
    strengths: ['Penalaran kompleks', 'Output berkualitas tinggi'],
    weaknesses: ['Lambat', 'Membutuhkan sumber daya besar'],
    useCases: ['Penelitian', 'Pemrograman lanjutan', 'Tugas kompleks'],
    tokenLimit: 32000
  },
  {
    id: 'nvidia/llama-3.1-nemotron-ultra-253b-v1:free',
    name: 'Llama-3.1-Nemotron-Ultra-253B',
    category: 'XLarge',
    description: 'Model ultra-large Nvidia dengan 253B parameter',
    features: ['Ukuran model sangat besar', 'Kemampuan penalaran tingkat tinggi'],
    strengths: ['Performa superior', 'Pemahaman mendalam', 'Output berkualitas sangat tinggi'],
    weaknesses: ['Sangat lambat', 'Membutuhkan sumber daya sangat besar'],
    useCases: ['Riset AI', 'Tugas kompleks', 'Penalaran lanjutan'],
    tokenLimit: 32000
  },
  {
    id: 'meta-llama/llama-4-maverick:free',
    name: 'Llama-4-Maverick',
    category: 'Large',
    description: 'Model LLaMA 4 generasi terbaru dari Meta',
    features: ['Arsitektur LLaMA 4', 'Kemampuan luas'],
    strengths: ['Performa tinggi', 'Pemahaman konteks yang baik'],
    weaknesses: ['Membutuhkan sumber daya substansial'],
    useCases: ['Chat lanjutan', 'Pemrograman', 'Penalaran'],
    tokenLimit: 32000
  },
  {
    id: 'meta-llama/llama-4-scout:free',
    name: 'Llama-4-Scout',
    category: 'Medium',
    description: 'Versi lebih ringan dari LLaMA 4 dari Meta',
    features: ['Arsitektur LLaMA 4 yang dioptimalkan', 'Performa yang baik'],
    strengths: ['Lebih cepat dari Maverick', 'Keseimbangan performa/ukuran'],
    weaknesses: ['Kemampuan tidak sekuat versi lebih besar'],
    useCases: ['Chat umum', 'Tugas sehari-hari', 'Pemrograman dasar'],
    tokenLimit: 32000
  },
  {
    id: 'deepseek/deepseek-v3-base:free',
    name: 'DeepSeek-V3-Base',
    category: 'Medium',
    description: 'Model dasar DeepSeek versi 3',
    features: ['Arsitektur terbaru DeepSeek', 'Kemampuan penalaran baik'],
    strengths: ['Keseimbangan performa dan ukuran', 'Kemampuan umum yang baik'],
    weaknesses: ['Tidak sebaik model yang lebih besar'],
    useCases: ['Chat umum', 'Pemrograman', 'Tugas bahasa'],
    tokenLimit: 32000
  },
  {
    id: 'allenai/molmo-7b-d:free',
    name: 'Molmo-7B-D',
    category: 'Medium',
    description: 'Model Allen AI dengan 7B parameter',
    features: ['Keseimbangan ukuran dan performa', 'Dikembangkan oleh Allen AI'],
    strengths: ['Efisien untuk kebanyakan tugas', 'Respons berkualitas'],
    weaknesses: ['Tidak sekuat model yang lebih besar'],
    useCases: ['Chat umum', 'Tugas bahasa standar', 'Belajar'],
    tokenLimit: 16000
  },
  {
    id: 'qwen/qwen2.5-vl-3b-instruct:free',
    name: 'Qwen2.5-VL-3B-Instruct',
    category: 'Vision',
    description: 'Model vision-language Qwen dengan 3B parameter',
    features: ['Kemampuan vision-language', 'Ukuran yang efisien'],
    strengths: ['Ringan untuk model multimodal', 'Respons cepat'],
    weaknesses: ['Kemampuan terbatas dibanding model VL yang lebih besar'],
    useCases: ['Analisis gambar sederhana', 'Tugas multimodal ringan'],
    tokenLimit: 8000
  },
  {
    id: 'bytedance-research/ui-tars-72b:free',
    name: 'UI-TARS-72B',
    category: 'XLarge',
    description: 'Model besar 72B parameter dengan kemampuan memahami UI',
    features: ['Pemahaman UI dan interaksi', 'Ukuran model besar'],
    strengths: ['Pemahaman UI superior', 'Penalaran kompleks'],
    weaknesses: ['Sangat lambat', 'Membutuhkan banyak sumber daya'],
    useCases: ['UI/UX design', 'Interaksi UI', 'Tugas kompleks'],
    tokenLimit: 32000
  },
  {
    id: 'qwen/qwen2.5-vl-32b-instruct:free',
    name: 'Qwen2.5-VL-32B-Instruct',
    category: 'Vision',
    description: 'Model vision-language Qwen besar dengan 32B parameter',
    features: ['Kemampuan vision-language lanjutan', 'Performa tinggi'],
    strengths: ['Pemahaman visual yang baik', 'Output berkualitas tinggi'],
    weaknesses: ['Lambat', 'Membutuhkan banyak sumber daya'],
    useCases: ['Analisis gambar komprehensif', 'Visual reasoning', 'Tugas multimodal kompleks'],
    tokenLimit: 8000
  },
  {
    id: 'deepseek/deepseek-chat-v3-0324:free',
    name: 'DeepSeek-Chat-V3-0324',
    category: 'Medium',
    description: 'Model chat DeepSeek versi 3 dengan optimasi dialog',
    features: ['Dioptimalkan untuk percakapan', 'Pemahaman konteks baik'],
    strengths: ['Interaksi alami', 'Kemampuan dialog yang baik'],
    weaknesses: ['Tidak sebaik model yang lebih besar'],
    useCases: ['Chat umum', 'Customer support', 'Asisten virtual'],
    tokenLimit: 32000
  }
];

// Menggabungkan semua model
const allModels = [...models, ...modelsPartTwo, ...modelsPartThree];

// Mendapatkan kategori model
const getCategories = () => {
  const categories = new Set();
  allModels.forEach(model => categories.add(model.category));
  return Array.from(categories);
};

// Mendapatkan model berdasarkan kategori
const getModelsByCategory = (category) => {
  return allModels.filter(model => model.category === category);
};

// Mendapatkan model berdasarkan ID
const getModelById = (id) => {
  return allModels.find(model => model.id === id);
};

// Mendapatkan model default
const getDefaultModel = () => {
  return getModelById('qwen/qwen3-0.6b-04-28:free');
};

module.exports = {
  allModels,
  getCategories,
  getModelsByCategory,
  getModelById,
  getDefaultModel,
};
