import type { ResearchItem } from "@/lib/types";

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
    highlight: { value: "8% → 0%", label: "expert mis-dispatch rate" },
    details: {
      problem:
        "Picture a clinician uploading an abdominal CT scan, and the AI quietly runs a brain-tumor segmentation model on it. The mask looks clean and convincing, yet it means nothing clinically. VILA-M3, NVIDIA and MONAI's radiology vision-language model, picks its specialist models by writing a special token into its own free-text answer, which a regex then parses. We measured how often that goes wrong: overall routing accuracy was 73%, chest X-ray requests were routed correctly only 36% of the time, and 8% of requests triggered an expert that should never have run.",
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
      stack: ["PyTorch", "BioMedCLIP", "VILA-M3", "MONAI", "Temperature scaling"],
      next: "Written up as a scientific paper for GEMASTIK 2026.",
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
    pipeline: ["Microphone", "RNNoise", "Faster Whisper", "LLM", "TTS"],
    contributions: [
      "ASR — Benchmarked Faster Whisper tiny/base/small on an Intel NUC and cut live word-error rate from 17.1% to 7.2% with real-time noise suppression (RNNoise) and domain-aware handling of BRONE, FILKOM, and Brawijaya terms.",
      "LLM — Tackled the ~26 s response latency of the GPT-4o baseline. Experimented with a local Qwen 3.5 0.8B model, which was fast but lacked reasoning quality, then moved to DeepSeek V4 Flash — smart, cheap, and fast.",
    ],
    highlight: { value: "17.1% → 7.2%", label: "live word-error rate" },
    details: {
      problem:
        "BRONE is Brawijaya University's campus robot. Visitors walk up, say “halo”, and ask it things in Indonesian. The first version ran entirely on cloud APIs and took 17–29 seconds to answer, which feels like forever when you're standing in front of a robot. It also kept mishearing its own name and the campus it lives on, turning BRONE into “Brown” and garbling FILKOM and Brawijaya.",
      approach: [
        {
          title: "Find where the time goes",
          body: "I broke the cloud pipeline's latency down stage by stage. Speech-to-text (~1.5 s) and text-to-speech (~1.7 s) were not the problem. The LLM call alone took 91–95% of the time until the robot started speaking.",
        },
        {
          title: "Try a small local model",
          body: "Qwen 3.5 0.8B on a Jetson Orin Nano answered fast (median time to first token 635 ms, no memory swapping) but got campus-knowledge questions wrong. The team moved to DeepSeek V4 Flash, which is fast, cheap, and actually correct.",
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
        "Led the week-1 latency breakdown that pointed the team at the LLM",
        "Tested local vs. cloud LLMs for latency and answer quality",
      ],
      stack: ["Python", "Faster Whisper", "CTranslate2", "RNNoise", "Jetson Orin Nano", "Intel NUC", "DeepSeek", "Qwen"],
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
    pipeline: ["QR Artifact", "Dialect", "Text-to-Gloss", "Skeleton Animation"],
    details: {
      problem:
        "Signesia turns spoken or written Indonesian into BISINDO, Indonesian Sign Language, performed by an animated signing avatar. Sign language is not word-for-word Indonesian. It has its own vocabulary and grammar, with no affixes and a different word order, so a sentence first has to become a sequence of glosses (sign labels) in BISINDO order. That text-to-gloss step is mine.",
      approach: [
        {
          title: "Understand where current models fall short",
          body: "Automatic metrics like BLEU looked good, but human evaluators often felt the meaning was lost. I dug into both the models and their training data to find out why.",
        },
        {
          title: "Learn from human corrections",
          body: "Evaluator corrections revealed how BISINDO sentences are really ordered. Time words come first, question words go last, and commands open with words like AYO or TOLONG.",
        },
        {
          title: "Grammar-aware rules",
          body: "Building on BISINDO linguistics research and guidance from my advisors, I'm designing a rule system that adapts word order to the type of sentence, with a lightweight classifier choosing the right pattern.",
        },
        {
          title: "Only glosses that can be signed",
          body: "Every word is reduced to a base form that exists in the sign vocabulary. Words with no sign fall back to fingerspelling.",
        },
      ],
      results: [
        { value: "Real-time", label: "rule-based glossing runs in milliseconds on a CPU" },
        { value: "Human-first", label: "evaluated on whether the meaning comes across, not just BLEU" },
      ],
      myRole: [
        "Owner of the text-to-gloss stage",
        "Analysis of previous models and data",
        "Design of the gloss rule system",
      ],
      stack: ["Python", "Stanza", "Sastrawi", "scikit-learn"],
      next: "Validating the rules with BISINDO experts.",
    },
  },
];
