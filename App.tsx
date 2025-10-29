
import React, { useState, useEffect } from 'react';
import type { Publication, Conference } from './types';
import SectionCard from './components/SectionCard';
import Modal from './components/Modal';
import { BriefcaseIcon, NewsIcon, BookOpenIcon, UserCircleIcon, SunIcon, MoonIcon, MailIcon, LinkedinIcon, FileTextIcon, AcademicCapIcon, ResearchGateIcon, OrcidIcon, HeartIcon, GiftIcon, UsersIcon, BuildingOfficeIcon } from './components/Icons';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  useEffect(() => {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const newIsDarkMode = !prev;
      if (newIsDarkMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return newIsDarkMode;
    });
  };
  
  const publications: Publication[] = [
    {
      title: "Differential Organ Ageing Is Associated With Age‐Related Macular Degeneration",
      authors: "Papadam A, Lionikas A, Grassmann F.",
      journal: "Aging Cell",
      year: 2025,
      doi: "10.1111/acel.14473",
    },
    {
      title: "Tapping natures rhythm: the role of season in mitochondrial function and genetics in the UK biobank",
      authors: "Papadam A, Mihov M, Koller A, Weissensteiner H, Stark K, Grassmann F.",
      journal: "Hum Genomics",
      year: 2025,
      doi: "10.1186/s40246-025-00743-8",
    },
     {
      title: "Retinal polyunsaturated fatty acid supplementation reverses aging-related vision decline in mice",
      authors: "Gao F, Tom E, Rydz C, Cho W, Kolesnikov A V., Sha Y, Papadam A, et al.",
      journal: "Sci Transl Med",
      year: 2025,
      doi: "10.1126/scitranslmed.ads5769",
    },
  ];

  const conferences: Conference[] = [
    {
      title: "The role of somatic chromosomal abundance in risk and prognosis of age-related macular degeneration",
      authors: "Anastasios Papadam; Bernhard Hf Weber; Emily Y Chew; Claudia Strachwitz; Felix Grassmann",
      event: "ARVO",
      location: "US",
      year: 2024,
    },
    {
      title: "Exploring the Genetic Landscape of Geographic Atrophy Progression: A GWAS in 2,472 Individuals with AMD",
      authors: "Amy Stockwell; Anastasios Papadam; Tiarnan D L Keenan; Catherine Cukras; Elvira Agron; Emily Y Chew; Bernhard Hf Weber; Brian Yaspan; Felix Grassmann",
      event: "ARVO",
      location: "US",
      year: 2024,
    },
    {
      title: "The role of somatic chromosomal abundance in risk and prognosis of age-related macular degeneration",
      authors: "Anastasios Papadam; Bernhard Hf Weber; Emily Y Chew; Claudia Strachwitz; Felix Grassmann",
      event: "ProRetina",
      location: "Germany",
      year: 2023,
    }
  ];

  const sections = {
    research: {
      id: 'research',
      title: 'Current Research',
      icon: <BriefcaseIcon />,
      content: (
        <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-2">
            <p className="leading-relaxed">
              My current research, which has been submitted for defence at the University of Aberdeen, focuses on the role of chromosomal abundance in risk and prognosis of age-related macular degeneration.
            </p>
            <p className="leading-relaxed">
              Age-related macular degeneration (AMD) is a multifactorial and progressive disorder that primarily targets the macula, the central region of the retina. It represents the leading cause of irreversible central vision loss in individuals over 55 years of age in Western populations <sup><a href="#ref-1" className="text-sky-500 dark:text-sky-400 hover:underline">[1]</a></sup>. Globally, AMD currently affects more than 200 million people, and this figure is projected to increase by approximately 88 million within the next decade <sup><a href="#ref-1" className="text-sky-500 dark:text-sky-400 hover:underline">[1]</a></sup>.
            </p>
            <p className="leading-relaxed">
              A key pathological feature of AMD is the development of small yellow deposits, known as drusen, which accumulate between the retinal pigment epithelium (RPE) and the choroid. These deposits consist mainly of proteins, lipids, and other cellular remnants. The size of drusen and the degeneration of photoreceptors and RPE cells are central to disease classification <sup><a href="#ref-2" className="text-sky-500 dark:text-sky-400 hover:underline">[2]</a></sup>. AMD is clinically categorized into three stages: early, intermediate, and late. The late stage is further subdivided into geographic atrophy (GA) and choroidal neovascular AMD (CNV). Early AMD is characterized by intermediate-sized drusen without pigmentary abnormalities, whereas intermediate AMD presents with large drusen and/or pigmentary changes. In the late stage, disease progression results in either CNV or GA. GA involves the partial to complete loss of photoreceptors, the RPE, and the choriocapillaris, leading to the formation of atrophic lesions that vary in size, number, and position but typically enlarge at a rate of 1.3–2.6 mm² per year <sup><a href="#ref-3" className="text-sky-500 dark:text-sky-400 hover:underline">[3–6]</a></sup>. GA accounts for approximately 35–40% of late AMD cases, most commonly affecting individuals older than 85 years <sup><a href="#ref-7" className="text-sky-500 dark:text-sky-400 hover:underline">[7,8]</a></sup>. In contrast, CNV progresses more rapidly, characterized by the growth of abnormal blood vessels beneath the retina, resulting in fluid leakage and potential retinal damage if untreated <sup><a href="#ref-9" className="text-sky-500 dark:text-sky-400 hover:underline">[9]</a></sup>. Fortunately, CNV can be managed through intravitreal injections of anti-vascular endothelial growth factor (anti-VEGF) agents.
            </p>
            <p className="leading-relaxed">
              Over the past decade, significant research has uncovered multiple AMD risk factors. Age remains the most influential determinant, while genetic predisposition, smoking, and body mass index (BMI) also play substantial roles <sup><a href="#ref-10" className="text-sky-500 dark:text-sky-400 hover:underline">[10]</a></sup>. The influence of gender on AMD susceptibility remains under discussion within the scientific community <sup><a href="#ref-11" className="text-sky-500 dark:text-sky-400 hover:underline">[11]</a></sup>. A major genome-wide association study (GWAS) conducted by the International AMD Genomics Consortium (IAMDGC) in 2016 identified and confirmed numerous risk variants, bringing the total to 52 independent variants across 34 genomic loci <sup><a href="#ref-11" className="text-sky-500 dark:text-sky-400 hover:underline">[11–13]</a></sup>. Subsequent meta-analyses incorporating diverse cohorts have revealed additional variants, albeit with smaller effect sizes. These studies have implicated several biological pathways—particularly those involving the complement system, extracellular matrix regulation, and lipid metabolism—which collectively account for roughly half of AMD’s heritable risk <sup><a href="#ref-12" className="text-sky-500 dark:text-sky-400 hover:underline">[12]</a></sup>.
            </p>
            <p className="leading-relaxed">
              Recent findings have emphasized the role of mosaicism in age-related health conditions. Mosaicism refers to the coexistence of two or more genetically distinct cell populations within an organism. The extent and size of these genetic alterations influence their phenotypic impact. Among mosaic events, the most extensively studied is the mosaic loss of the Y chromosome (mLOY) in aging males <sup><a href="#ref-15" className="text-sky-500 dark:text-sky-400 hover:underline">[15]</a></sup>, which occurs in up to 40% of elderly men <sup><a href="#ref-16" className="text-sky-500 dark:text-sky-400 hover:underline">[16]</a></sup>. Notably, mLOY has been linked to increased all-cause mortality, Alzheimer’s disease, cancer, and advanced AMD <sup><a href="#ref-15" className="text-sky-500 dark:text-sky-400 hover:underline">[15,17–22]</a></sup>.
            </p>
            <p className="leading-relaxed">
              Building on these observations, our study investigates the association between somatic chromosomal abundance and AMD risk in both sexes. We derive a continuous measure of mosaic sex chromosome loss from genotyping intensity data from the IAMDGC and UK Biobank cohorts. Furthermore, we assess how somatic chromosomal variation influences the progression and severity of geographic atrophy, with a focus on GA lesion size and annual growth rate.
            </p>

            <div>
              <div className="border-t border-slate-200 dark:border-slate-700"></div>
              <h3 className="font-bold text-lg text-sky-600 dark:text-sky-400 pt-4 mb-2 font-sans">Other Research Projects</h3>
              <p className="leading-relaxed mb-3">Other projects include:</p>
              <ol className="list-decimal list-inside space-y-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                <li>The genetic architecture of Geographic Atrophy Progression.</li>
                <li>Exploring the atlas of genetic risk scores in relationship to age-related macular degeneration.</li>
                <li>Exploring the role of different genes in eye-related diseases, and retina health.</li>
                <li>Utilising machine learning to predict disease outcomes and physiological traits.</li>
              </ol>
            </div>

            <div className="border-t border-slate-200 dark:border-slate-700"></div>
            
            <h3 className="font-bold text-lg text-sky-600 dark:text-sky-400 pt-2 font-sans">References</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-slate-500 dark:text-slate-400 leading-normal">
                <li id="ref-1">Wong WL, Su X, Li X, Cheung CMG, Klein R, Cheng CY, et al. Global prevalence of age-related macular degeneration and disease burden projection for 2020 and 2040: a systematic review and meta-analysis. Lancet Glob Health. 2014 Feb;2(2):e106–16.</li>
                <li id="ref-2">Ferris FL, Wilkinson CP, Bird A, Chakravarthy U, Chew E, Csaky K, et al. Clinical Classification of Age-related Macular Degeneration. Ophthalmology. 2013 Apr;120(4):844–51.</li>
                <li id="ref-3">The AREDS Research Group. Change in Area of Geographic Atrophy in the Age-Related Eye Disease Study. Archives of Ophthalmology. 2009 Sep 14;127(9):1168.</li>
                <li id="ref-4">Fleckenstein M, Schmitz-Valckenberg S, Adrion C, Visvalingam S, Göbel AP, Mössner A, et al. Progression of Age-Related Geographic Atrophy: Role of the Fellow Eye. Investigative Opthalmology & Visual Science. 2011 Aug 22;52(9):6552.</li>
                <li id="ref-5">Fleckenstein M, Adrion C, Schmitz-Valckenberg S, Göbel AP, Bindewald-Wittich A, Scholl HPN, et al. Concordance of Disease Progression in Bilateral Geographic Atrophy Due to AMD. Investigative Opthalmology & Visual Science. 2010 Feb 1;51(2):637.</li>
                <li id="ref-6">Klein ML, Ferris FL, Francis PJ, Lindblad AS, Chew EY, Hamon SC, et al. Progression of Geographic Atrophy and Genotype in Age-Related Macular Degeneration. Ophthalmology. 2010 Aug;117(8):1554-1559.e1.</li>
                <li id="ref-7">Klein R, Klein BEK, Knudtson MD, Meuer SM, Swift M, Gangnon RE. Fifteen-Year Cumulative Incidence of Age-Related Macular Degeneration. Ophthalmology. 2007 Feb;114(2):253–62.</li>
                <li id="ref-8">Augood CA. Prevalence of Age-Related Maculopathy in Older Europeans. Archives of Ophthalmology. 2006 Apr 1;124(4):529.</li>
                <li id="ref-9">Lim LS, Mitchell P, Seddon JM, Holz FG, Wong TY. Age-related macular degeneration. The Lancet. 2012 May;379(9827):1728–38.</li>
                <li id="ref-10">Grassmann F, Fauser S, Weber BHF. The genetics of age-related macular degeneration (AMD) – Novel targets for designing treatment options? European Journal of Pharmaceutics and Biopharmaceutics [Internet]. 2015 Sep;95:194–202. Available from: https://linkinghub.elsevier.com/retrieve/pii/S0939641115002271</li>
                <li id="ref-11">Winkler TW, Brandl C, Grassmann F, Gorski M, Stark K, Loss J, et al. Investigating the modulation of genetic effects on late AMD by age and sex: Lessons learned and two additional loci. PLoS One [Internet]. 2018 Mar 12;13(3):e0194321. Available from: https://dx.plos.org/10.1371/journal.pone.0194321</li>
                <li id="ref-12">Fritsche LG, Igl W, Bailey JNC, Grassmann F, Sengupta S, Bragg-Gresham JL, et al. A large genome-wide association study of age-related macular degeneration highlights contributions of rare and common variants. Nat Genet [Internet]. 2016 Feb 21;48(2):134–43. Available from: http://www.nature.com/articles/ng.3448</li>
                <li id="ref-13">Grassmann F, Heid IM, Weber BHF. Recombinant Haplotypes Narrow the ARMS2/HTRA1 Association Signal for Age-Related Macular Degeneration. Genetics [Internet]. 2017 Feb 1;205(2):919–24. Available from: https://academic.oup.com/genetics/article/205/2/919/6066453</li>
                <li id="ref-14">Gorski M, Grunin M, Herold JM, Fröhlich B, Behr M, Wheeler N, et al. Diverse ancestry GWAS for advanced age-related macular degeneration in TOPMed-imputed and Ophthalmologically-confirmed 16,108 cases and 18,038 controls. 2024.</li>
                <li id="ref-15">Francis M, Gorman BR, Bigdeli TB, Genovese G, Voloudakis G, Bendl J, et al. Multi-ancestry genome-wide association meta-analysis of mosaic loss of chromosome Y in the Million Veteran Program identifies 240 novel loci. 2024.</li>
                <li id="ref-16">Han X, Gharahkhani P, Mitchell P, Liew G, Hewitt AW, MacGregor S. Genome-wide meta-analysis identifies novel loci associated with age-related macular degeneration. J Hum Genet. 2020 Aug 10;65(8):657–65.</li>
                <li id="ref-17">Jacobs KB, Yeager M, Zhou W, Wacholder S, Wang Z, Rodriguez-Santiago B, et al. Detectable clonal mosaicism and its relationship to aging and cancer. Nat Genet [Internet]. 2012 Jun 6;44(6):651–8. Available from: http://www.nature.com/articles/ng.2270</li>
                <li id="ref-18">Forsberg LA. Loss of chromosome Y (LOY) in blood cells is associated with increased risk for disease and mortality in aging men. Hum Genet [Internet]. 2017 May 19;136(5):657–63. Available from: http://link.springer.com/10.1007/s00439-017-1799-2</li>
                <li id="ref-19">Thompson DJ, Genovese G, Halvardson J, Ulirsch JC, Wright DJ, Terao C, et al. Genetic predisposition to mosaic Y chromosome loss in blood. Nature [Internet]. 2019 Nov 28;575(7784):652–7. Available from: http://www.nature.com/articles/s41586-019-1765-3</li>
                <li id="ref-20">Noveski P, Madjunkova S, Sukarova Stefanovska E, Matevska Geshkovska N, Kuzmanovska M, Dimovski A, et al. Loss of Y Chromosome in Peripheral Blood of Colorectal and Prostate Cancer Patients. PLoS One [Internet]. 2016 Jan 8;11(1):e0146264. Available from: https://dx.plos.org/10.1371/journal.pone.0146264</li>
                <li id="ref-21">Forsberg LA, Gisselsson D, Dumanski JP. Mosaicism in health and disease — clones picking up speed. Nat Rev Genet [Internet]. 2017 Feb 12;18(2):128–42. Available from: http://www.nature.com/articles/nrg.2016.145</li>
                <li id="ref-22">Forsberg LA, Rasi C, Malmqvist N, Davies H, Pasupulati S, Pakalapati G, et al. Mosaic loss of chromosome Y in peripheral blood is associated with shorter survival and higher risk of cancer. Nat Genet [Internet]. 2014 Jun 28;46(6):624–8. Available from: http://www.nature.com/articles/ng.2966</li>
            </ol>
        </div>
      ),
    },
    news: {
      id: 'news',
      title: 'Scientific News & Insights',
      icon: <NewsIcon />,
      content: (
        <div className="space-y-6 max-h-[65vh] overflow-y-auto pr-2 text-sm">
          <div>
            <h5 className="font-semibold font-sans">1. Pegcetacoplan (Syfovre): The OAKS and DERBY Trials</h5>
            <p className="leading-relaxed mt-1">The OAKS and DERBY studies were two parallel, 24-month, multicenter, randomized, double-masked, sham-controlled Phase 3 trials designed to evaluate the efficacy and safety of intravitreal pegcetacoplan in patients with GA. At 24 months, treatment with pegcetacoplan demonstrated a statistically significant reduction in the rate of GA lesion growth compared to sham, with an increasing effect over time. This anatomical benefit did not translate to a statistically significant preservation of visual function within the study period, and treatment was associated with an increased rate of conversion to neovascular (wet) AMD.</p>
            <div className="text-xs italic text-slate-500 dark:text-slate-400 mt-2 space-y-1">
              <p><strong>Citation:</strong> Heier, J. S., et al. (2023). Pegcetacoplan for the treatment of geographic atrophy... <em>The Lancet, 402(10411)</em>, 1434-1448.</p>
              <p><strong>DOI:</strong> <a href="https://doi.org/10.1016/S0140-6736(23)01526-X" target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:underline">https://doi.org/10.1016/S0140-6736(23)01526-X</a></p>
            </div>
          </div>
          <div className="border-t border-slate-200 dark:border-slate-700"></div>
          <div>
            <h5 className="font-semibold font-sans">2. Avacincaptad Pegol (Izervay): The GATHER2 Trial</h5>
            <p className="leading-relaxed mt-1">The GATHER2 study was a Phase 3 trial that evaluated the efficacy and safety of monthly intravitreal injections of avacincaptad pegol, a C5 inhibitor. The trial successfully met its primary endpoint, demonstrating a statistically significant reduction in the rate of GA lesion growth of approximately 14% compared to sham over 12 months. The safety profile was generally favorable, though treatment was associated with an increased risk of macular neovascularization.</p>
            <div className="text-xs italic text-slate-500 dark:text-slate-400 mt-2 space-y-1">
              <p><strong>Citation:</strong> Jaffe, G. J., et al. (2023). Efficacy and safety of avacincaptad pegol in patients with geographic atrophy (GATHER2)... <em>The Lancet, 402(10411)</em>, 1449-1458.</p>
              <p><strong>DOI:</strong> <a href="https://doi.org/10.1016/S0140-6736(23)01583-0" target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:underline">https://doi.org/10.1016/S0140-6736(23)01583-0</a></p>
            </div>
          </div>
          <div className="border-t border-slate-200 dark:border-slate-700"></div>
          <div>
            <h5 className="font-semibold font-sans">3. Deep-Learning Quantification of OCT in the FILLY Trial</h5>
            <p className="leading-relaxed mt-1">A post-hoc analysis of the Phase 2 FILLY trial employed a deep-learning model to analyze OCT scans, allowing for independent measurement of RPE loss and photoreceptor degeneration (PRD). The analysis confirmed that pegcetacoplan slowed the rate of RPE loss and identified that the presence of isolated PRD at baseline was a strong predictor of subsequent GA lesion growth, establishing a novel OCT-based biomarker for high-risk patients.</p>
            <div className="text-xs italic text-slate-500 dark:text-slate-400 mt-2 space-y-1">
              <p><strong>Citation:</strong> Fu, D. J., et al. (2024). Deep-learning automated quantification of longitudinal OCT scans... <em>British Journal of Ophthalmology, 108(4)</em>, 536-545.</p>
              <p><strong>DOI:</strong> <a href="https://doi.org/10.1136/bjo-2022-322672" target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:underline">https://doi.org/10.1136/bjo-2022-322672</a></p>
            </div>
          </div>
          <div className="border-t border-slate-200 dark:border-slate-700"></div>
          <div>
            <h5 className="font-semibold font-sans">4. Ixo-vec (Adverum Biotechnologies) for Neovascular AMD</h5>
            <p className="leading-relaxed mt-1">Adverum is advancing its gene therapy candidate, Ixo-vec, into a large-scale Phase 3 program for wet AMD. Promising results from Phase 1 and 2 trials demonstrated that a single intravitreal injection of Ixo-vec, which expresses the anti-VEGF protein aflibercept, resulted in a durable therapeutic effect, with patients showing a dramatic reduction in the need for supplemental anti-VEGF injections over several years.</p>
            <div className="text-xs italic text-slate-500 dark:text-slate-400 mt-2 space-y-1">
              <p><strong>Citation:</strong> Research in late-stage clinical development (e.g., ARTEMIS, NCT06856577); peer-reviewed publication of pivotal trial results is pending.</p>
            </div>
          </div>
          <div className="border-t border-slate-200 dark:border-slate-700"></div>
          <div>
            <h5 className="font-semibold font-sans">5. GT005 (Gyroscope Therapeutics) for Geographic Atrophy</h5>
            <p className="leading-relaxed mt-1">Representing a personalized approach, GT005 is a gene therapy designed for a subset of GA patients with specific genetic risk factors. The therapy uses an AAV vector to increase the production of Complement Factor I (CFI). A Phase 2 trial is evaluating its efficacy in GA patients who carry rare genetic variants in the CFI gene associated with low CFI protein levels.</p>
            <div className="text-xs italic text-slate-500 dark:text-slate-400 mt-2 space-y-1">
              <p><strong>Citation:</strong> Research is ongoing in Phase 2 clinical trials; results are anticipated in the coming years.</p>
            </div>
          </div>
          <div className="border-t border-slate-200 dark:border-slate-700"></div>
          <div>
            <h5 className="font-semibold font-sans">6. Longitudinal Dynamics and Gene-Specific Fitness of CHIP Mutations</h5>
            <p className="leading-relaxed mt-1">A pivotal study in <em>Nature Medicine</em> analyzed longitudinal blood samples to measure the growth rates of different CHIP mutations. The study revealed that gene identity is a primary determinant of clonal fitness, with mutations in genes like <em>SF3B1</em>, <em>SRSF2</em>, and <em>TP53</em> conferring a significantly higher fitness advantage and faster clonal expansion compared to more common mutations in <em>DNMT3A</em> and <em>TET2</em>.</p>
            <div className="text-xs italic text-slate-500 dark:text-slate-400 mt-2 space-y-1">
              <p><strong>Citation:</strong> Robertson, N. A., et al. (2022). Longitudinal dynamics of clonal hematopoiesis identifies gene-specific fitness effects. <em>Nature Medicine, 28(7)</em>, 1439-1446.</p>
              <p><strong>DOI:</strong> <a href="https://doi.org/10.1038/s41591-022-01883-3" target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:underline">https://doi.org/10.1038/s41591-022-01883-3</a></p>
            </div>
          </div>
          <div className="border-t border-slate-200 dark:border-slate-700"></div>
          <div>
            <h5 className="font-semibold font-sans">7. Cost-Effective Longitudinal Profiling of CHIP Dynamics</h5>
            <p className="leading-relaxed mt-1">A study in <em>Immunity & Ageing</em> developed a cost-effective sequencing assay to track clonal dynamics over long periods. They found that the majority of clones (52.1%) expanded over time, with a median doubling period of 7.43 years, and showed that once a clone reaches the conventional CHIP detection threshold (variant allele fraction &ge; 2%), it generally continues to grow.</p>
            <div className="text-xs italic text-slate-500 dark:text-slate-400 mt-2 space-y-1">
              <p><strong>Citation:</strong> Uddin, M. M., et al. (2022). Longitudinal profiling of clonal hematopoiesis provides insight into clonal dynamics. <em>Immunity & Ageing, 19(1)</em>, 23.</p>
              <p><strong>DOI:</strong> <a href="https://doi.org/10.1186/s12979-022-00278-9" target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:underline">https://doi.org/10.1186/s12979-022-00278-9</a></p>
            </div>
          </div>
          <div className="border-t border-slate-200 dark:border-slate-700"></div>
          <div>
            <h5 className="font-semibold font-sans">8. Single-Cell Multi-omics Reveal Phenotypes of DNMT3A Mutations</h5>
            <p className="leading-relaxed mt-1">A study in <em>Nature Genetics</em> used a single-cell multi-omics approach to link genotype to phenotype in individuals with CHIP. They discovered that the <em>DNMT3A R882</em> mutation biases stem cell differentiation toward the myeloid lineage by causing targeted hypomethylation at specific DNA motifs enriched for hematopoietic transcription factor binding sites.</p>
            <div className="text-xs italic text-slate-500 dark:text-slate-400 mt-2 space-y-1">
              <p><strong>Citation:</strong> Nam, A. S., et al. (2022). Single-cell multi-omics of human clonal hematopoiesis... <em>Nature Genetics, 54(10)</em>, 1514-1526.</p>
              <p><strong>DOI:</strong> <a href="https://doi.org/10.1038/s41588-022-01179-9" target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:underline">https://doi.org/10.1038/s41588-022-01179-9</a></p>
            </div>
          </div>
          <div className="border-t border-slate-200 dark:border-slate-700"></div>
          <div>
            <h5 className="font-semibold font-sans">9. Distinct Epigenetic Signatures of DNMT3A and TET2 CHIP</h5>
            <p className="leading-relaxed mt-1">An EWAS in <em>Nature Communications</em> found that mutations in the two most common CHIP genes, <em>DNMT3A</em> and <em>TET2</em>, have distinct and opposing effects on the methylome. Despite these molecular differences, both mutations enhance stem cell self-renewal, and Mendelian randomization suggested associated methylation changes may be causally linked to increased coronary artery disease risk.</p>
            <div className="text-xs italic text-slate-500 dark:text-slate-400 mt-2 space-y-1">
              <p><strong>Citation:</strong> Uddin, M. M., et al. (2022). Clonal hematopoiesis of indeterminate potential, DNA methylation, and risk for coronary artery disease. <em>Nature Communications, 13(1)</em>, 5350.</p>
              <p><strong>DOI:</strong> <a href="https://doi.org/10.1038/s41467-022-33093-3" target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:underline">https://doi.org/10.1038/s41467-022-33093-3</a></p>
            </div>
          </div>
          <div className="border-t border-slate-200 dark:border-slate-700"></div>
          <div>
            <h5 className="font-semibold font-sans">10. TP53-Mediated CHIP and Doxorubicin-Induced Cardiomyopathy</h5>
            <p className="leading-relaxed mt-1">A study in <em>JCI Insight</em> using a mouse model found that mice with <em>Trp53</em>-mutant hematopoietic cells experienced significantly worse cardiac toxicity after treatment with doxorubicin. The mechanism involved an amplified inflammatory response, with increased neutrophil infiltration into the heart muscle, suggesting that therapy-related CHIP can directly contribute to heart failure risk in cancer survivors.</p>
            <div className="text-xs italic text-slate-500 dark:text-slate-400 mt-2 space-y-1">
              <p><strong>Citation:</strong> Sano, S., et al. (2021). TP53-mediated therapy-related clonal hematopoiesis contributes to doxorubicin-induced cardiomyopathy... <em>JCI Insight, 6(16)</em>, e146076.</p>
              <p><strong>DOI:</strong> <a href="https://doi.org/10.1172/jci.insight.146076" target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:underline">https://doi.org/10.1172/jci.insight.146076</a></p>
            </div>
          </div>
          <div className="border-t border-slate-200 dark:border-slate-700"></div>
          <div>
            <h5 className="font-semibold font-sans">11. JAK2-Mediated CHIP Accelerates Heart Failure</h5>
            <p className="leading-relaxed mt-1">A study in <em>JACC: Basic to Translational Science</em> developed a mouse model where the <em>JAK2 V617F</em> mutation was expressed in myeloid cells. These mice exhibited accelerated pathological remodeling and heart failure in response to cardiac stress, a mechanism involving heightened myocardial inflammation, demonstrating that <em>JAK2</em>-mutated myeloid cells are pro-inflammatory.</p>
            <div className="text-xs italic text-slate-500 dark:text-slate-400 mt-2 space-y-1">
              <p><strong>Citation:</strong> Sano, S., et al. (2019). JAK2V617F-Mediated Clonal Hematopoiesis Accelerates Pathological Remodeling in Murine Heart Failure. <em>JACC: Basic to Translational Science, 4(6)</em>, 684-697.</p>
              <p><strong>DOI:</strong> <a href="https://doi.org/10.1016/j.jacbts.2019.05.013" target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:underline">https://doi.org/10.1016/j.jacbts.2019.05.013</a></p>
            </div>
          </div>
          <div className="border-t border-slate-200 dark:border-slate-700"></div>
          <div>
            <h5 className="font-semibold font-sans">12. Somatic Mutation as an Explanation for Epigenetic Aging</h5>
            <p className="leading-relaxed mt-1">This landmark study in <em>Nature Aging</em> discovered that a single age-related mutation event (C>T at methylated CpG sites) is associated with predictable remodeling of the surrounding methylation landscape. This allowed the construction of a "mutation clock" that predicts chronological age with accuracy comparable to epigenetic clocks, suggesting that epigenetic aging is largely a downstream readout of cumulative somatic mutation burden.</p>
            <div className="text-xs italic text-slate-500 dark:text-slate-400 mt-2 space-y-1">
              <p><strong>Citation:</strong> Koch, Z., et al. (2024). Somatic mutation as an explanation for epigenetic aging. <em>Nature Aging, 5</em>, 709-719.</p>
              <p><strong>DOI:</strong> <a href="https://doi.org/10.1038/s43587-024-00794-x" target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:underline">https://doi.org/10.1038/s43587-024-00794-x</a></p>
            </div>
          </div>
          <div className="border-t border-slate-200 dark:border-slate-700"></div>
          <div>
            <h5 className="font-semibold font-sans">13. Transcriptomic Consequences of CRISPR-Mediated Y-Chromosome Elimination</h5>
            <p className="leading-relaxed mt-1">A 2024 study in <em>Scientific Reports</em> used CRISPR/Cas9 to eliminate the Y chromosome from a human male retinal cell line. RNA-sequencing revealed significant expression changes in hundreds of autosomal genes involved in cell migration, angiogenesis, and immune responses, providing the first direct experimental proof that loss of Y is not a passive biomarker but an active driver of pro-disease cellular states.</p>
            <div className="text-xs italic text-slate-500 dark:text-slate-400 mt-2 space-y-1">
              <p><strong>Citation:</strong> Celli, L., et al. (2024). CRISPR/Cas9 mediated Y-chromosome elimination affects human cells transcriptome. <em>Scientific Reports, 14(1)</em>, 2119.</p>
              <p><strong>DOI:</strong> <a href="https://doi.org/10.1038/s41598-024-53549-9" target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:underline">https://doi.org/10.1038/s41598-024-53549-9</a></p>
            </div>
          </div>
          <div className="border-t border-slate-200 dark:border-slate-700"></div>
          <div>
            <h5 className="font-semibold font-sans">14. Mosaic Loss of Y Chromosome in Brain Microglia</h5>
            <p className="leading-relaxed mt-1">A recent preprint study provided the first evidence of mosaic loss of the Y chromosome (mLOY) occurring within brain cells, specifically microglia. Researchers found that nearly 8% of microglia from older men showed evidence of LOY, and this was associated with the dysregulation of genes involved in inflammatory response and lipoprotein metabolism, pathways strongly linked to Alzheimer's disease.</p>
            <div className="text-xs italic text-slate-500 dark:text-slate-400 mt-2 space-y-1">
              <p><strong>Citation:</strong> Dumanski, J. P., et al. (2021). Mosaic loss of chromosome Y in migratory human microglia and its role in Alzheimer's disease. <em>bioRxiv</em>.</p>
              <p><strong>DOI:</strong> <a href="https://doi.org/10.1101/2021.11.19.469312" target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:underline">https://doi.org/10.1101/2021.11.19.469312</a></p>
            </div>
          </div>
          <div className="border-t border-slate-200 dark:border-slate-700"></div>
          <div>
            <h5 className="font-semibold font-sans">15. A LINE-1 Element Drives Escape from X-Inactivation at KDM5C</h5>
            <p className="leading-relaxed mt-1">A study in <em>Human Molecular Genetics</em> discovered that the ability of the gene <em>KDM5C</em> to escape X-chromosome inactivation is driven by a LINE-1 retrotransposon located within the gene's first intron. This reveals a novel mechanism whereby mobile genetic elements can influence gene expression and contribute to phenotypic diversity between sexes.</p>
            <div className="text-xs italic text-slate-500 dark:text-slate-400 mt-2 space-y-1">
              <p><strong>Citation:</strong> Balaton, B. P., et al. (2024). Escape from X-chromosome inactivation at KDM5C is driven by a LINE-1 element. <em>Human Molecular Genetics, 33(11)</em>, 978-988.</p>
              <p><strong>DOI:</strong> <a href="https://doi.org/10.1093/hmg/ddae031" target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:underline">https://doi.org/10.1093/hmg/ddae031</a></p>
            </div>
          </div>
          <div className="border-t border-slate-200 dark:border-slate-700"></div>
          <div>
            <h5 className="font-semibold font-sans">16. Causal Relationship Between Telomere Length and mtDNA Copy Number</h5>
            <p className="leading-relaxed mt-1">A 2024 study in <em>Aging</em> used bidirectional Mendelian randomization and found a significant, one-way causal effect where genetically predicted shorter telomere length was causally associated with a decrease in mitochondrial DNA (mtDNA) copy number. This establishes a causal hierarchy, suggesting nuclear genome instability is an upstream event that drives mitochondrial depletion in aging.</p>
            <div className="text-xs italic text-slate-500 dark:text-slate-400 mt-2 space-y-1">
              <p><strong>Citation:</strong> Zhang, Y., et al. (2024). New insights from bidirectional Mendelian randomization... <em>Aging, 16(10)</em>, 8345-8356.</p>
              <p><strong>DOI:</strong> <a href="https://doi.org/10.18632/aging.205728" target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:underline">https://doi.org/10.18632/aging.205728</a></p>
            </div>
          </div>
          <div className="border-t border-slate-200 dark:border-slate-700"></div>
          <div>
            <h5 className="font-semibold font-sans">17. Maternal Age and Purifying Selection of mtDNA Mutations</h5>
            <p className="leading-relaxed mt-1">A study in <em>Nature Aging</em> showed that purifying selection, a process that removes harmful mutations, occurs during oocyte maturation to prevent the transmission of pathogenic mtDNA variants to offspring. This selection process was found to be enhanced with maternal age, providing a mechanism to counteract the increased risk of accumulating mutations over time.</p>
            <div className="text-xs italic text-slate-500 dark:text-slate-400 mt-2 space-y-1">
              <p><strong>Citation:</strong> Ru, Y., et al. (2024). Maternal age enhances purifying selection on pathogenic mutations... <em>Nature Aging, 4(9)</em>, 1211-1230.</p>
              <p><strong>DOI:</strong> <a href="https://doi.org/10.1038/s43587-024-00672-6" target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:underline">https://doi.org/10.1038/s43587-024-00672-6</a></p>
            </div>
          </div>
          <div className="border-t border-slate-200 dark:border-slate-700"></div>
          <div>
            <h5 className="font-semibold font-sans">18. Dynamics of mtDNA Mosaicism in Somatic Cells</h5>
            <p className="leading-relaxed mt-1">Research in <em>Nature Communications</em> provided a comprehensive look at mtDNA mosaicism by sequencing thousands of single-cell-derived clones. This work provided fundamental parameters for the mtDNA mutation rate (5.0 &times; 10<sup>-8</sup> per base pair) and turnover frequency (10–20 times per year), which shape the landscape of mtDNA mosaicism over a lifetime.</p>
            <div className="text-xs italic text-slate-500 dark:text-slate-400 mt-2 space-y-1">
              <p><strong>Citation:</strong> Ju, Y. S., et al. (2023). Mitochondrial DNA mosaicism in normal human somatic cells. <em>Nature Communications, 14(1)</em>, 1234.</p>
              <p><strong>DOI:</strong> <a href="https://doi.org/10.1038/s41467-023-36873-z" target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:underline">https://doi.org/10.1038/s41467-023-36873-z</a></p>
            </div>
          </div>
          <div className="border-t border-slate-200 dark:border-slate-700"></div>
          <div>
            <h5 className="font-semibold font-sans">19. mtDNA Replication is Essential for Neurogenesis</h5>
            <p className="leading-relaxed mt-1">A study in <em>Development Growth & Regeneration</em> found that inhibiting mtDNA replication specifically impaired the generation of new neurons (neurogenesis) but did not affect the generation of glial cells. This suggests that mtDNA replication is essential for neuronal fate commitment, through mechanisms independent of simple energy production.</p>
            <div className="text-xs italic text-slate-500 dark:text-slate-400 mt-2 space-y-1">
              <p><strong>Citation:</strong> Hroudová, J., et al. (2024). Mitochondrial DNA replication is essential for neurogenesis... <em>Development, Growth & Differentiation</em>.</p>
              <p><strong>DOI:</strong> <a href="https://doi.org/10.1111/dgd.12903" target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:underline">https://doi.org/10.1111/dgd.12903</a></p>
            </div>
          </div>
          <div className="border-t border-slate-200 dark:border-slate-700"></div>
          <div>
            <h5 className="font-semibold font-sans">20. Mitochondrial Nucleotide Transport and Metabolism</h5>
            <p className="leading-relaxed mt-1">A review in <em>Cell Metabolism</em> highlights the complex mechanisms that supply mitochondria with nucleotides for mtDNA replication. Disturbance of this homeostasis can lead to a decline in mtDNA abundance and integrity, causing severe mitochondrial diseases, and is also relevant to physiological processes like the innate immune response.</p>
            <div className="text-xs italic text-slate-500 dark:text-slate-400 mt-2 space-y-1">
              <p><strong>Citation:</strong> Van der Verren, S. E., et al. (2024). High tide or low tide: the transport and metabolism of mitochondrial nucleotides. <em>Cell Metabolism, 36(8)</em>, 1635-1653.</p>
              <p><strong>DOI:</strong> <a href="https://doi.org/10.1016/j.cmet.2024.07.005" target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:underline">https://doi.org/10.1016/j.cmet.2024.07.005</a></p>
            </div>
          </div>
        </div>
      ),
    },
    publications: {
      id: 'publications',
      title: 'Publications & Conferences',
      icon: <BookOpenIcon />,
      content: (
        <div className="space-y-6 max-h-[65vh] overflow-y-auto pr-2">
          <div>
            <h3 className="font-bold text-lg text-sky-600 dark:text-sky-400 mb-2 font-sans">Peer-Reviewed Publications</h3>
            <ul className="space-y-4">
              {publications.map((pub, index) => (
                <li key={index}>
                  <p className="font-semibold text-slate-700 dark:text-slate-200">{pub.title}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{pub.authors} ({pub.year}). <em>{pub.journal}</em>.</p>
                  {pub.doi && <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noopener noreferrer" className="text-sm text-sky-500 dark:text-sky-400 hover:underline">https://doi.org/{pub.doi}</a>}
                </li>
              ))}
            </ul>
          </div>
          <div className="border-t border-slate-200 dark:border-slate-700"></div>
          <div>
            <h3 className="font-bold text-lg text-sky-600 dark:text-sky-400 pt-4 mb-2 font-sans">Conference Presentations</h3>
            <ul className="space-y-4">
              {conferences.map((conf, index) => (
                <li key={index}>
                  <p className="font-semibold text-slate-700 dark:text-slate-200">{conf.title}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{conf.authors}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400"><em>{conf.event}</em>, {conf.location}, {conf.year}.</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ),
    },
    about: {
      id: 'about',
      title: 'About Me & Contact',
      icon: <UserCircleIcon />,
      content: (
        <div className="space-y-4">
          <p className="leading-relaxed">
            I am Anastasios Papadam, an early-career researcher from Athens, Greece, specializing in the genetics of age-related disease.
          </p>
          <p className="leading-relaxed">
            I completed a five-year integrated Master's (M.Sci.) in Genetics, specializing in Immunology and Biobusiness, at the University of Aberdeen, Scotland, which included a key industrial placement. I then pursued my PhD, where my research focused on the role of chromosomal abundance in the risk and prognosis of age-related macular degeneration (AMD).
          </p>
          <p className="leading-relaxed">
            During my doctoral studies, my interests expanded to include the interconnected fields of biological ageing and how patients with AMD may exhibit differential organ ageing. I am now actively seeking a postdoctoral position where I can apply my skills, deepen my research, and contribute to new discoveries in the field.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-4 pt-2">
            <a href="mailto:a.papadam@hotmail.com" className="flex items-center text-slate-500 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-400 transition-colors">
              <MailIcon className="w-5 h-5 mr-2" /> Personal Email
            </a>
            <a href="mailto:a.papadam.21@abdn.ac.uk" className="flex items-center text-slate-500 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-400 transition-colors">
              <MailIcon className="w-5 h-5 mr-2" /> Work Email
            </a>
            <a href="https://www.linkedin.com/in/anastasios-papadam-11b432146" target="_blank" rel="noopener noreferrer" className="flex items-center text-slate-500 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-400 transition-colors">
              <LinkedinIcon className="w-5 h-5 mr-2" /> LinkedIn
            </a>
            <a href="https://www.researchgate.net/profile/Anastasios-Papadam-2" target="_blank" rel="noopener noreferrer" className="flex items-center text-slate-500 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-400 transition-colors">
              <ResearchGateIcon className="w-5 h-5 mr-2" /> ResearchGate
            </a>
            <a href="https://orcid.org/0000-0002-6780-6311" target="_blank" rel="noopener noreferrer" className="flex items-center text-slate-500 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-400 transition-colors">
              <OrcidIcon className="w-5 h-5 mr-2" /> ORCID
            </a>
          </div>
        </div>
      ),
    },
    funder: {
      id: 'funder',
      title: 'My Funder',
      icon: <HeartIcon />,
      content: (
        <div className="text-center">
          <p className="mb-4">My PhD research is proudly funded by Fight for Sight, the UK's leading eye research charity.</p>
          <a href="https://www.fightforsight.org.uk/" target="_blank" rel="noopener noreferrer" className="inline-block bg-sky-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-sky-600 transition-colors">
            Learn More About Fight for Sight
          </a>
        </div>
      )
    },
    donate: {
      id: 'donate',
      title: 'Support Eye Research',
      icon: <GiftIcon />,
      content: (
        <div className="space-y-3">
           <p>Your support can accelerate the discovery of new treatments and cures for sight loss. Consider donating to these leading organizations:</p>
           <ul className="list-disc list-inside space-y-2">
              <li><a href="https://www.fightforsight.org.uk/donate/" target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:underline">Fight for Sight</a></li>
              <li><a href="https://www.macularsociety.org/donate/" target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:underline">Macular Society</a></li>
              <li><a href="https://www.rnib.org.uk/donations-and-fundraising" target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:underline">Royal National Institute of Blind People (RNIB)</a></li>
           </ul>
        </div>
      )
    },
    lab: {
      id: 'lab',
      title: 'The Grassmann Lab',
      icon: <UsersIcon />,
      content: (
        <div className="space-y-4">
          <p className="leading-relaxed">
            As a member of The Grassmann Lab, my research contributes to our group's primary mission: to unravel the complex genetic architecture of inherited diseases and understand how genetic factors influence their severity and progression. Our work aims to move beyond simple risk identification to pinpoint novel therapeutic targets, especially for conditions with limited treatment options.
          </p>
          <p className="leading-relaxed">
            We investigate the genetic connections between different diseases, searching for shared pathways that might reveal new treatment opportunities. A key focus is on less-explored genetic markers, such as somatic mosaicism of sex chromosomes, which are emerging as crucial indicators for both disease risk and severity. By integrating these approaches, we hope to improve risk prediction, disease management, and ultimately, patient outcomes.
          </p>
          <div>
            <h4 className="font-semibold mb-2">Official Profiles:</h4>
            <ul className="list-disc list-inside space-y-1">
              <li><a href="https://ki.se/en/people/felix-grassmann" target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:underline">Karolinska Institutet Profile</a></li>
              <li><a href="https://www.health-and-medical-university.de/ueber-uns-2/team/team-fakultaet-medizin/prof-dr-felix-grassmann/" target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:underline">Health and Medical University Potsdam</a></li>
            </ul>
          </div>
        </div>
      ),
    },
    experience: {
      id: 'experience',
      title: 'Research & Industry Experience',
      icon: <BuildingOfficeIcon />,
      content: (
        <div className="space-y-6 max-h-[65vh] overflow-y-auto pr-2">
          <div>
            <h3 className="font-semibold text-slate-800 dark:text-slate-100">Demonstrator (UG & PG), University of Aberdeen, UK</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">2022–Present</p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Mentored students in epidemiology; delivered lectures/workshops on quantitative methods and analytical tools.</li>
              <li>Developed educational materials in genetic epidemiology; supported hands‑on tutorials and practicals.</li>
              <li>Provided guidance during tutorials and practicals in UG and PG courses in various fields, such as computational and molecular biology among others.</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 dark:text-slate-100">Intern — Genentech, California, US</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">Jun 2024–Sep 2024</p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Performed genome‑wide association studies linking image-derived phenotypes to genetic variants.</li>
              <li>Integrated association results with functional annotation resources to nominate high‑confidence variants/targets.</li>
              <li>Enforced stringent QC and version control; communicated results through technical reports and visual summaries.</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 dark:text-slate-100">NHS Certified COVID‑19 Tester, University of Aberdeen, UK</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">Dec 2020–May 2021</p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Guided participants through rapid testing workflows and proper reagent handling.</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 dark:text-slate-100">Placement Student, BSRC “Alexander Fleming”, Vari, Attica, Greece</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">Sep 2019–Aug 2020</p>
            <p className="text-sm italic mb-2">Project: Establishment of a novel PBL‑NSG model to induce primary/secondary T‑cell responses against lung cancer patient‑derived grafts</p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Cell culture (A549), staining and FACS; work with human lung tissues and experimental animals; quantitative image analysis (ImageJ).</li>
            </ul>
          </div>
        </div>
      )
    },
  };

  const navLinks = [
    { id: 'research', label: 'Research' },
    { id: 'experience', label: 'Experience' },
    { id: 'news', label: 'Insights' },
    { id: 'publications', label: 'Publications' },
    { id: 'lab', label: 'Lab'},
    { id: 'about', label: 'About' },
  ];

  const closeModal = () => setActiveModal(null);

  const renderModal = () => {
    if (!activeModal) return null;
    const section = sections[activeModal as keyof typeof sections];
    if (!section) return null;

    return (
      <Modal 
        isOpen={!!activeModal}
        onClose={closeModal}
        title={section.title}
        icon={section.icon}
      >
        {section.content}
      </Modal>
    );
  };
  
  return (
    <div className="min-h-screen text-slate-700 dark:text-slate-300 font-serif">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <AcademicCapIcon className="w-8 h-8 text-sky-600 dark:text-sky-400 mr-3" />
            <div>
              <h1 className="text-2xl font-black text-slate-800 dark:text-slate-100 font-sans">Anastasios Papadam</h1>
              <p className="text-md text-slate-500 dark:text-slate-400">PhD Candidate | Genetic Epidemiology</p>
            </div>
          </div>
          <button onClick={toggleDarkMode} className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 dark:focus:ring-offset-slate-900 transition-colors" aria-label="Toggle dark mode">
            {isDarkMode ? <SunIcon /> : <MoonIcon />}
          </button>
        </header>

        <nav className="mb-8 p-2 bg-white/60 dark:bg-slate-800/40 backdrop-blur-sm rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm sticky top-4 z-40">
          <ul className="flex flex-wrap justify-center sm:justify-start gap-x-2 gap-y-1 sm:gap-x-4">
            {navLinks.map(link => (
              <li key={link.id}>
                <button onClick={() => setActiveModal(link.id)} className="block px-3 py-1.5 text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-slate-100 dark:hover:bg-slate-700/50 rounded-md transition-all">
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        
        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="md:col-span-2 lg:col-span-3">
            <SectionCard id="about-card" title={sections.about.title} icon={sections.about.icon}>
              {sections.about.content}
            </SectionCard>
          </div>
           <SectionCard id="lab-card" title={sections.lab.title} icon={sections.lab.icon}>
            {sections.lab.content}
          </SectionCard>
          <SectionCard id="funder-card" title={sections.funder.title} icon={sections.funder.icon}>
            {sections.funder.content}
          </SectionCard>
          <SectionCard id="donate-card" title={sections.donate.title} icon={sections.donate.icon}>
            {sections.donate.content}
          </SectionCard>

        </main>
        
        <footer className="text-center mt-12 py-6 border-t border-slate-200 dark:border-slate-700">
          <div className="flex justify-center gap-6 mb-4">
            <a href="mailto:a.papadam@hotmail.com" title="Personal Email" className="text-slate-500 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"><MailIcon className="w-6 h-6" /></a>
            <a href="mailto:a.papadam.21@abdn.ac.uk" title="Work Email" className="text-slate-500 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"><MailIcon className="w-6 h-6" /></a>
            <a href="https://www.linkedin.com/in/anastasios-papadam-11b432146" target="_blank" rel="noopener noreferrer" title="LinkedIn" className="text-slate-500 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"><LinkedinIcon className="w-6 h-6" /></a>
            <a href="https://www.researchgate.net/profile/Anastasios-Papadam-2" target="_blank" rel="noopener noreferrer" title="ResearchGate" className="text-slate-500 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"><ResearchGateIcon className="w-6 h-6" /></a>
            <a href="https://orcid.org/0000-0002-6780-6311" target="_blank" rel="noopener noreferrer" title="ORCID" className="text-slate-500 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"><OrcidIcon className="w-6 h-6" /></a>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">&copy; {new Date().getFullYear()} Anastasios Papadam. All rights reserved.</p>
        </footer>
      </div>
      {renderModal()}
    </div>
  );
};

export default App;
