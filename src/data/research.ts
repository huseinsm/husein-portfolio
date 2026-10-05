import type { ResearchItem } from "@/lib/types";

import safetyArchitecture from "@/assets/projects/safety-layer/architecture.png";
import safetyDispatchComparison from "@/assets/projects/safety-layer/dispatch-comparison.jpg";
import safetyLayerFigure from "@/assets/projects/safety-layer/safety-layer.jpg";
import safetyCaseStudy from "@/assets/projects/safety-layer/case-study.jpg";
import safetyDemo from "@/assets/projects/safety-layer/vila-m3-demo.jpg";
import broneArchitecture from "@/assets/projects/brone/architecture.png";
import broneRobot from "@/assets/projects/brone/robot.jpg";
import broneExhibition from "@/assets/projects/brone/exhibition.jpg";
import signesiaArchitecture from "@/assets/projects/signesia/architecture.png";
import signesiaPromo from "@/assets/projects/signesia/promo.jpg";
import signesiaHome from "@/assets/projects/signesia/home.jpg";
import signesiaVoiceToSign from "@/assets/projects/signesia/voice-to-sign.jpg";

export const research: ResearchItem[] = [
  {
    code: "SAFETY-LAYER",
    categories: ["cv", "nlp"],
    title: "Calibrated Safety Layer",
    subtitle:
      "Preventing expert mis-dispatch in the radiology vision-language model VILA-M3",
    role: "Co-author · Researcher",
    affiliation: "Intelligent System Lab × Kalbe Digital Lab",
    period: "Aug 2026 — Ongoing",
    status: "Ongoing",
    pipeline: ["Image + Query", "BioMedCLIP", "MLP Router", "Confidence Gate", "VILA-M3 Expert"],
    architecture: {
      src: safetyArchitecture,
      caption:
        "Safety layer architecture: frozen BioMedCLIP encoders read the image and the query, an MLP router picks the expert, and a calibrated confidence gate decides whether to call it.",
    },
    highlight: { value: "8% → 0%", label: "expert mis-dispatch rate" },
    details: {
      problem:
        "Picture a clinician uploading an abdominal CT scan, and the AI quietly runs a brain-tumor segmentation model on it. The mask looks clean and convincing, yet it means nothing clinically. VILA-M3, NVIDIA and MONAI's radiology vision-language model, picks its specialist models by writing a special token into its own free-text answer, which a regex then parses. We measured how often that goes wrong on 200 samples: overall routing accuracy was 73%, chest X-ray requests were routed correctly only 36% of the time, and 8% of requests triggered an expert that should never have run.",
      approach: [
        {
          title: "Take the decision away from the generator",
          body: "Instead of trusting tokens the VLM happens to generate, a separate lightweight router decides which expert to call before VILA-M3 writes anything: BRATS (brain MRI), VISTA3D (CT organs), TorchXRayVision (chest X-ray), or none.",
        },
        {
          title: "Read the image and the question together",
          body: "Frozen BioMedCLIP encoders embed the image and the query (512-d each). The concatenated vector feeds a 1–2 layer MLP. Ablations showed both signals are required: image-only fails on generic questions, and text-only is badly calibrated (ECE 0.649).",
        },
        {
          title: "Train on the hard cases",
          body: "The router is trained with hard negatives: a generic question on an expert-type image, and an expert question on the wrong modality. Both should map to 'none'. A Switch-style balance loss keeps any one class from dominating.",
        },
        {
          title: "Abstain when unsure",
          body: "Temperature scaling calibrates the confidence scores. If the top probability falls below a threshold τ, the layer withholds the call and VILA-M3 answers directly. Here, abstaining is the safe outcome, not a failure.",
        },
      ],
      results: [
        { value: "8% → 0%", label: "expert mis-dispatch (200 samples, McNemar p ≪ 0.001)" },
        { value: "36% → 100%", label: "chest X-ray routing accuracy" },
        { value: "+17.5 pp", label: "over the best fixed regex parser" },
        { value: "23.7 ms", label: "added latency per query on an L40 GPU" },
      ],
      myRole: [
        "Ran VILA-M3 locally on GPU to produce the baseline",
        "Ran inference over the evaluation set and stored every VLM response",
        "Analyzed the responses to measure how often, and why, the built-in expert routing failed",
      ],
      stack: [
        "Python",
        "PyTorch",
        "BioMedCLIP",
        "VILA-M3",
        "MONAI (VISTA3D, BRATS)",
        "TorchXRayVision",
        "Temperature scaling",
      ],
      gallery: [
        {
          src: safetyDispatchComparison,
          caption:
            "Expert dispatch, before and after: (a) original VILA-M3, where the expert token and the regex parser are the failure points; (b) the proposed design with a confidence-gated router.",
          wide: true,
        },
        {
          src: safetyLayerFigure,
          caption: "The safety layer: BioMedCLIP encoders, MLP router, and confidence gate.",
        },
        {
          src: safetyCaseStudy,
          caption:
            "Case study: (a) VISTA3D is called when max(p) = 0.97 ≥ τ; (b) the call is withheld when max(p) = 0.41 < τ.",
        },
        {
          src: safetyDemo,
          caption: "VILA-M3 demo (MONAI): abdominal CT organ segmentation by the VISTA3D expert.",
          wide: true,
        },
      ],
      next: "The paper is a finalist in GEMASTIK XIX 2026, Scientific Paper category.",
    },
  },
  {
    code: "BRONE",
    categories: ["nlp"],
    title: "BRONE",
    subtitle: "Indonesian voice assistant robot for Brawijaya University",
    role: "Speech-to-Text (ASR) & LLM Engineer",
    affiliation: "Brawijaya University",
    period: "Aug 2026 — Ongoing",
    status: "Ongoing",
    pipeline: ["Microphone", "RNNoise", "Faster Whisper", "DeepSeek V4 Flash", "Piper TTS"],
    architecture: {
      src: broneArchitecture,
      caption:
        "BRONE voice pipeline: from the visitor's voice through noise suppression, speech recognition and the campus-knowledge LLM to a spoken answer and the robot's facial expression.",
    },
    repo: "https://github.com/yukienjoyer7/brone-talk-nuc",
    contributions: [
      "ASR — Benchmarked Faster Whisper tiny/base/small on an Intel NUC and cut live word-error rate from 17.1% to 7.2% with real-time noise suppression (RNNoise) and domain-aware handling of BRONE, FILKOM, and Brawijaya terms.",
      "LLM — Traced 91–95% of the cloud baseline's response time (median 17.1 s with GPT-4o, 25.2 s with gpt-audio-mini) to the LLM. Tested a local Qwen3.5-0.8B model, which was fast (635 ms to first token) but weak on campus knowledge, then moved to DeepSeek V4 Flash — smart, cheap, and fast.",
    ],
    highlight: { value: "17.1% → 7.2%", label: "live word-error rate" },
    details: {
      problem:
        "BRONE is Brawijaya University's campus robot. Visitors walk up, say “halo”, and ask it things in Indonesian. The first version ran entirely on cloud APIs and took a median of 17.1 seconds to start answering with GPT-4o, and 25.2 seconds with the single-call gpt-audio-mini mode, which feels like forever when you're standing in front of a robot. It also kept mishearing its own name and the campus it lives on, turning BRONE into “Brown” and garbling FILKOM and Brawijaya.",
      approach: [
        {
          title: "One conversation, end to end",
          body: "After a visitor says “halo”, RNNoise cleans the audio, Faster Whisper transcribes it, DeepSeek V4 Flash answers from a Brawijaya knowledge base, and Piper TTS speaks the reply while the robot's screen face changes expression over MQTT.",
        },
        {
          title: "Find where the time goes",
          body: "I broke the cloud pipeline's latency down stage by stage. Speech-to-text (~1.5 s) and text-to-speech (~1.7 s) were not the problem. The LLM call alone took 91–95% of the time until the robot started speaking.",
        },
        {
          title: "Try a small local model",
          body: "Qwen3.5-0.8B on a Jetson Orin Nano answered fast (median time to first token 635 ms, no memory swapping) but got campus-knowledge questions wrong. The team moved to DeepSeek V4 Flash, which is fast, cheap, and actually correct.",
        },
        {
          title: "Benchmark speech recognition on the edge",
          body: "I built a harness that measures word-error rate, errors on domain terms, first-token latency and real-time factor. With it I swept Faster Whisper tiny, base and small (CTranslate2, int8) on the same frozen set of 20 recordings the cloud baseline was scored on.",
        },
        {
          title: "Teach it the campus vocabulary",
          body: "Seeding the decoder with an initial prompt of campus terms (BRONE, FILKOM, Brawijaya) worked far better than hotword boosting. Domain-term errors dropped from 14 of 20 recordings to 1, without a bigger model.",
        },
        {
          title: "Survive a noisy hallway",
          body: "Real-time RNNoise suppression in front of the recognizer brought the live word-error rate down from 17.1% to 7.2% on the robot's Intel NUC.",
        },
      ],
      results: [
        { value: "17.1% → 7.2%", label: "live word-error rate" },
        { value: "14 → 1", label: "recordings with a misheard campus term (of 20)" },
        { value: "91–95%", label: "of response latency traced to the LLM" },
        { value: "635 ms", label: "local SLM time-to-first-token on Jetson" },
      ],
      myRole: [
        "Owned speech-to-text: benchmark harness, model sweep, prompt biasing, noise suppression",
        "Led the latency breakdown that pointed the team at the LLM",
        "Tested local vs. cloud LLMs for latency and answer quality",
      ],
      stack: [
        "Python",
        "Faster Whisper",
        "CTranslate2",
        "RNNoise",
        "DeepSeek V4 Flash",
        "Qwen3.5 (Ollama)",
        "Piper TTS",
        "MQTT",
        "ROS 2",
        "Jetson Orin Nano",
        "Intel NUC",
      ],
      gallery: [
        { src: broneRobot, caption: "BRONE, with its expressive face on the screen." },
        { src: broneExhibition, caption: "BRONE talking with visitors at an exhibition." },
      ],
      next: "Deploying the tuned recognizer on the robot and measuring latency on its own hardware.",
    },
  },
  {
    code: "SIGNESIA",
    categories: ["nlp"],
    title: "SIGNESIA",
    subtitle: "BISINDO (Indonesian Sign Language) cultural preservation app",
    role: "NLP Engineer (Text-to-Gloss)",
    affiliation: "Brawijaya University",
    period: "Jul 2026 — Ongoing",
    status: "Ongoing",
    pipeline: ["Voice / QR", "Speech-to-Text", "Text-to-Gloss", "Sign Lookup", "Skeleton Avatar"],
    architecture: {
      src: signesiaArchitecture,
      caption:
        "SIGNESIA pipeline: voice or QR input becomes Indonesian text, the eight-stage Adaptive SOPK rules turn it into BISINDO glosses, and a skeleton avatar signs them.",
    },
    contributions: [
      "Text-to-Gloss — Built an eight-stage rule system that raised gloss-order agreement with human evaluator corrections from Kendall τ 0.36 to 0.53, at a median 173 ms per sentence on a CPU.",
    ],
    highlight: { value: "0.36 → 0.53", label: "gloss-order agreement (Kendall τ)" },
    details: {
      problem:
        "Signesia opens up Indonesian culture to Deaf people through BISINDO, Indonesian Sign Language. Users can scan a QR code on a cultural artifact, turn speech into sign in real time with a choice of regional dialect, browse a culture library, and learn BISINDO. Sign language is not word-for-word Indonesian. It has its own vocabulary and grammar, with no affixes and a different word order, so a sentence first has to become a sequence of glosses (sign labels) in BISINDO order. That text-to-gloss step is mine.",
      approach: [
        {
          title: "Understand where current models fall short",
          body: "Automatic metrics like BLEU looked good, but human evaluators often felt the meaning was lost. The cause was in the training data: the old labeling rule sorted most words alphabetically, so the models learned to copy that order.",
        },
        {
          title: "Learn from human corrections",
          body: "Evaluator corrections revealed how BISINDO sentences are really ordered. Time words come first, question words go last, and commands open with words like AYO or TOLONG.",
        },
        {
          title: "Adaptive SOPK rules",
          body: "Built on BISINDO linguistics research and my advisors' guidance, the rules run in eight stages: normalize slang and non-standard words, merge multi-word phrases, parse with Stanza, classify the sentence type, arrange the SOPK structure (subject, object, predicate, adverbial), select the words to sign, reduce them to base forms, and check them against the sign vocabulary.",
        },
        {
          title: "Only glosses that can be signed",
          body: "Every gloss is checked against the sign vocabulary of 1,033 signs, recorded from native signers and extracted with MediaPipe Holistic. Words with no sign fall back to fingerspelling.",
        },
      ],
      results: [
        { value: "0.36 → 0.53", label: "Kendall τ order agreement with evaluator corrections, vs. the old alphabetical rule" },
        { value: "173 ms", label: "median latency per sentence on a CPU" },
        { value: "1,033", label: "signs in the avatar's skeleton vocabulary" },
        { value: "Human-first", label: "evaluated on whether the meaning comes across, not just BLEU" },
      ],
      myRole: [
        "Owner of the text-to-gloss stage",
        "Analysis of previous models and their training data",
        "Design and implementation of the gloss rule system, with a Python API, CLI, and FastAPI service",
      ],
      stack: ["Python", "Stanza", "Sastrawi", "scikit-learn", "FastAPI", "MediaPipe Holistic"],
      gallery: [
        {
          src: signesiaPromo,
          caption: "SIGNESIA: a digital platform for inclusive cultural literacy for the Deaf community.",
        },
        {
          src: signesiaHome,
          caption: "App home: Scan Artifact, Voice to Sign, Culture Library, and Learn BISINDO.",
        },
        {
          src: signesiaVoiceToSign,
          caption: "Real-time Voice to Sign: “selamat malam” (good evening) performed by the skeleton avatar.",
          wide: true,
        },
      ],
      next: "Validating the rules with BISINDO experts.",
    },
  },
];
