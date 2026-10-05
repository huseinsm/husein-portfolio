import type { Project, ProjectCategory, ResearchItem } from "@/lib/types";

import safetyDemo from "@/assets/projects/safety-layer/vila-m3-demo.jpg";
import broneRobot from "@/assets/projects/brone/robot.jpg";
import signesiaPromo from "@/assets/projects/signesia/promo.jpg";
import stuntingArchitecture from "@/assets/projects/stunting/architecture.png";
import stuntingMotherForm from "@/assets/projects/stunting/app-mother-form.jpg";
import stuntingChildForm from "@/assets/projects/stunting/app-child-form.jpg";
import stuntingConfusionMatrix from "@/assets/projects/stunting/confusion-matrix.jpg";
import stuntingNotebook from "@/assets/projects/stunting/notebook-inference.jpg";

export const categoryLabels: Record<ProjectCategory, string> = {
  cv: "Computer Vision",
  nlp: "NLP",
  ml: "Machine Learning",
  data: "Data Analysis",
};

const gh = (repo: string) => `https://github.com/huseinsm/${repo}`;

/** Finished projects written up like the research items. They open from the Projects grid but are not listed under Research. */
export const projectStories: ResearchItem[] = [
  {
    code: "STUNTING",
    categories: ["ml"],
    title: "Stunting Intervention Recommendation",
    subtitle: "Helping posyandu cadres decide which stunting intervention each family needs first",
    role: "ML Engineer · App Developer",
    affiliation: "Team project",
    status: "Completed",
    pipeline: ["Mother & Child Data", "Encoding + Scaling", "Random Forest", "Intervention + Guidance", "SmartStunt App"],
    architecture: {
      src: stuntingArchitecture,
      caption:
        "SmartStunt pipeline: 17 mother and child indicators are encoded and scaled, a Random Forest picks one of four interventions, and the app explains it with practical guidance and risk factors.",
    },
    repo: gh("stunting-intervention-recommendation"),
    highlight: { value: "96%", label: "accuracy" },
    details: {
      problem:
        "Stunting is still one of Indonesia's largest child-health problems, and the right response differs from family to family. A child who is underweight but eats well needs something different from a child whose family lives far from the nearest clinic. This system helps posyandu cadres and health workers decide which intervention each family should get first: supplementary feeding (PMT), regular check-ups at the puskesmas, nutrition education, or other support such as sanitation, aid, or parenting.",
      approach: [
        {
          title: "Read the whole household",
          body: "The model reads 17 indicators. Eight describe the mother and household, such as age, education, distance to a health facility, BPJS health insurance and antenatal visits. Nine describe the child, such as weight, height, immunization, exclusive breastfeeding, and a history of diarrhea or infection.",
        },
        {
          title: "Keep the model simple",
          body: "Categorical columns are ordinal-encoded and every feature is MinMax-scaled. A 100-tree Random Forest is trained on 500 records with a 70/30 split to pick one of the four interventions.",
        },
        {
          title: "Check where it fails",
          body: "All six test errors come from the same class: nutrition-education cases predicted as “other”. It is also the class with the least data, so more examples of it would help the most.",
        },
        {
          title: "Give advice a parent can act on",
          body: "Every recommendation comes with a practical explanation and a list of risk factors taken from the input, shown in SmartStunt, a Streamlit web app.",
        },
      ],
      results: [
        { value: "96%", label: "accuracy (144 of 150 test records)" },
        { value: "0.91", label: "macro-F1 across the four interventions" },
        { value: "17", label: "mother and child indicators per family" },
        { value: "4", label: "interventions, each with practical guidance" },
      ],
      myRole: [
        "Built the machine-learning pipeline: preprocessing, training, and evaluation",
        "Built the SmartStunt web app in Streamlit",
      ],
      stack: ["Python", "pandas", "scikit-learn", "Random Forest", "seaborn", "Streamlit"],
      gallery: [
        { src: stuntingMotherForm, caption: "SmartStunt: the mother's data form and the recommended intervention." },
        { src: stuntingChildForm, caption: "The child's data form, with the intervention explained and the risk factors listed." },
        { src: stuntingConfusionMatrix, caption: "Random Forest confusion matrix on the 150 test records." },
        {
          src: stuntingNotebook,
          caption: "Inference in the notebook: a “regular check-up at the puskesmas” recommendation with its explanation.",
        },
      ],
    },
  },
];

export const projects: Project[] = [
  // Ongoing research and project stories: these open a detail panel instead of a repo
  {
    title: "Calibrated Safety Layer",
    categories: ["cv", "nlp"],
    research: "SAFETY-LAYER",
    cover: { src: safetyDemo },
    description:
      "A confidence-gated router that stops a radiology VLM from sending a CT scan to a brain-tumor model, and abstains when it isn't sure.",
    tags: ["BioMedCLIP", "VILA-M3", "Calibration"],
    highlight: { value: "8% → 0%", label: "mis-dispatch" },
  },
  {
    title: "BRONE",
    categories: ["nlp"],
    research: "BRONE",
    cover: { src: broneRobot, position: "50% 30%" },
    description:
      "Speech recognition for a campus robot that talks to visitors. Tuned Faster Whisper and noise suppression until it could hear its own name.",
    tags: ["Faster Whisper", "RNNoise", "Edge AI"],
    highlight: { value: "17.1% → 7.2%", label: "live WER" },
  },
  {
    title: "SIGNESIA",
    categories: ["nlp"],
    research: "SIGNESIA",
    cover: { src: signesiaPromo },
    description:
      "Turning Indonesian sentences into BISINDO sign-language glosses that follow sign-language grammar, so a signing avatar can perform them.",
    tags: ["Text-to-Gloss", "Stanza", "Rule-based NLP"],
    highlight: { value: "0.36 → 0.53", label: "gloss order (τ)" },
  },
  {
    title: "Stunting Intervention Recommendation",
    categories: ["ml"],
    research: "STUNTING",
    cover: { src: stuntingMotherForm, position: "50% 0%" },
    description:
      "Reads 17 mother-and-child health indicators and recommends one of four stunting interventions, with practical guidance in the SmartStunt app.",
    tags: ["Random Forest", "Streamlit", "Health"],
    highlight: { value: "96%", label: "accuracy" },
    team: true,
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
