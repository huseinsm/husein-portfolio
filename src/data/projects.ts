import type { Project, ProjectCategory } from "@/lib/types";

export const categoryLabels: Record<ProjectCategory, string> = {
  cv: "Computer Vision",
  nlp: "NLP",
  ml: "Machine Learning",
  data: "Data Analysis",
};

const gh = (repo: string) => `https://github.com/huseinsm/${repo}`;

export const projects: Project[] = [
  // Ongoing research: these open a detail panel instead of a repo
  {
    title: "Calibrated Safety Layer",
    categories: ["cv", "nlp"],
    research: "SAFETY-LAYER",
    description:
      "A confidence-gated router that stops a radiology VLM from sending a CT scan to a brain-tumor model, and abstains when it isn't sure.",
    tags: ["BioMedCLIP", "VILA-M3", "Calibration"],
    highlight: { value: "8% → 0%", label: "mis-dispatch" },
  },
  {
    title: "BRONE",
    categories: ["nlp"],
    research: "BRONE",
    description:
      "Speech recognition for a campus robot that talks to visitors. Tuned Faster Whisper and noise suppression until it could hear its own name.",
    tags: ["Faster Whisper", "RNNoise", "Edge AI"],
    highlight: { value: "17.1% → 7.2%", label: "live WER" },
  },
  {
    title: "SIGNESIA",
    categories: ["nlp"],
    research: "SIGNESIA",
    description:
      "Turning Indonesian sentences into BISINDO sign-language glosses that follow sign-language grammar, so a signing avatar can perform them.",
    tags: ["Text-to-Gloss", "Stanza", "Rule-based NLP"],
  },

  // Computer Vision
  {
    title: "Face Detection & Blurring",
    categories: ["cv"],
    repo: gh("face-detection-and-blurring"),
    description:
      "Anonymizes faces in images, videos and live webcam feeds using MediaPipe detection and OpenCV blurring. One CLI, three input modes.",
    tags: ["MediaPipe", "OpenCV", "CLI"],
  },
  {
    title: "Color Detection",
    categories: ["cv"],
    repo: gh("color-detection"),
    description:
      "Real-time HSV color tracking that boxes every blob of a chosen color, including red, whose hue wraps around both ends of the scale.",
    tags: ["OpenCV", "HSV", "Real-time"],
  },
  {
    title: "Image Classification",
    categories: ["cv"],
    repo: gh("image-classification"),
    description:
      "An SVM that tells empty parking spots from occupied ones using 15×15 pixel crops, tuned with grid search over C and gamma.",
    tags: ["scikit-learn", "SVM", "scikit-image"],
  },

  // NLP
  {
    title: "IMDB Sentiment Analysis",
    categories: ["nlp"],
    repo: gh("imdb-sentiment-analysis"),
    description:
      "Three models stalled at 74% on 50K movie reviews, so the bottleneck was the features. A wider TF-IDF vocabulary took logistic regression to 89%.",
    tags: ["TF-IDF", "NLTK", "Logistic Regression"],
    highlight: { value: "74% → 89%", label: "accuracy" },
  },

  // Machine Learning
  {
    title: "Stunting Intervention Recommendation",
    categories: ["ml"],
    repo: gh("stunting-intervention-recommendation"),
    description:
      "Reads 17 mother-and-child health indicators and recommends one of four stunting interventions, with practical guidance a parent can act on.",
    tags: ["Random Forest", "Health", "Classification"],
    highlight: { value: "96%", label: "accuracy" },
    team: true,
  },
  {
    title: "Bootcamp Graduation Prediction",
    categories: ["ml"],
    repo: gh("bootcamp-graduation-prediction"),
    description:
      "Predicting who passes a data-science bootcamp with no labels at all: seven activity logs, merged per participant, clustered with K-Means and DBSCAN.",
    tags: ["K-Means", "DBSCAN", "PCA"],
    highlight: { value: "47 / 48", label: "methods agree" },
    team: true,
  },
  {
    title: "House Prices Prediction",
    categories: ["ml"],
    repo: gh("house-prices-prediction"),
    description:
      "Kaggle regression with correlation-guided imputation and engineered features. XGBoost beat four other models after a 144-combination grid search.",
    tags: ["XGBoost", "Feature Engineering", "Kaggle"],
    highlight: { value: "$15.5K", label: "MAE" },
  },
  {
    title: "UKM Recommendation System",
    categories: ["ml"],
    repo: gh("ukm-recommendation-system"),
    description:
      "Matches students with the right organizations among 37 at Universitas Brawijaya, using nine-trait profiles and cosine similarity.",
    tags: ["Content-based", "Cosine Similarity", "pandas"],
  },

  // Data Analysis
  {
    title: "Airlines Flights Analysis",
    categories: ["data"],
    repo: gh("airlines-flights-analysis"),
    description:
      "What drives airfare? 300K Indian domestic bookings, nine questions. Class, airline and booking day matter; the route barely does.",
    tags: ["pandas", "seaborn", "EDA"],
    highlight: { value: "8×", label: "Business vs Economy" },
  },
];
