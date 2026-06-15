
import React, { useState, useEffect } from 'react';
import type { Publication, Conference } from './types';
import Modal from './components/Modal';
import InsightsDigest from './components/InsightsDigest';
import GenomeSystemsVisual from './components/GenomeSystemsVisual';
import { BriefcaseIcon, NewsIcon, BookOpenIcon, UserCircleIcon, SunIcon, MoonIcon, MailIcon, LinkedinIcon, AcademicCapIcon, ResearchGateIcon, OrcidIcon, HeartIcon, GiftIcon, UsersIcon, ShieldCheckIcon, BuildingOfficeIcon } from './components/Icons';

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
      title: "Tapping nature's rhythm: the role of season in mitochondrial function and genetics in the UK Biobank",
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
              My PhD research, successfully completed at the University of Aberdeen, focused on the influence of mosaicism in age-related macular degeneration (AMD). This work investigates the role of somatic chromosomal abundance in the risk and prognosis of AMD, with particular emphasis on understanding how mosaic variations contribute to disease development and progression.
            </p>
            <p className="leading-relaxed">
              Age-related macular degeneration (AMD) is a multifactorial and progressive disorder that primarily targets the macula, the central region of the retina. It represents the leading cause of irreversible vision loss in older adults across developed nations, affecting millions worldwide.
            </p>
            <p className="leading-relaxed">
              A key pathological feature of AMD is the development of small yellow deposits, known as drusen, which accumulate between the retinal pigment epithelium (RPE) and the choroid. These deposits are composed of lipids, proteins, and other cellular debris, and their presence is strongly associated with AMD progression and severity.
            </p>
            <p className="leading-relaxed">
              Over the past decade, significant research has uncovered multiple AMD risk factors. Age remains the most influential determinant, while genetic predisposition, smoking, and body mass index also play substantial roles in disease susceptibility and manifestation.
            </p>
            <p className="leading-relaxed">
              Recent findings have emphasized the role of mosaicism in age-related health conditions. Mosaicism refers to the coexistence of two or more genetically distinct cell populations within an individual, arising from somatic mutations during development or throughout life. This phenomenon has emerged as a critical factor in understanding age-related diseases.
            </p>
            <p className="leading-relaxed">
              During my doctoral research, I investigated the association between somatic chromosomal mosaicism and AMD risk in both sexes. I derived continuous measures of mosaic chromosomal variations from genotyping intensity data from large-scale cohorts, and assessed how somatic chromosomal variation influences the progression and severity of geographic atrophy, with a focus on lesion size and annual growth rate.
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
                <li id="ref-1">Wong WL, Su X, Li X, Cheung CMG, Klein R, Cheng CY, et al. Global prevalence of age-related macular degeneration and disease burden projection for 2020 and 2040: a systematic review and meta-analysis. The Lancet Global Health. 2014 Feb;2(2):e106–16.</li>
                <li id="ref-2">Ferris FL, Wilkinson CP, Bird A, Chakravarthy U, Chew E, Csaky K, et al. Clinical Classification of Age-related Macular Degeneration. Ophthalmology. 2013 Apr;120(4):844–51.</li>
                <li id="ref-3">The AREDS Research Group. Change in Area of Geographic Atrophy in the Age-Related Eye Disease Study. Archives of Ophthalmology. 2009 Sep 14;127(9):1168.</li>
                <li id="ref-4">Fleckenstein M, Schmitz-Valckenberg S, Adrion C, Visvalingam S, Göbel AP, Mössner A, et al. Progression of Age-Related Geographic Atrophy: Role of the Fellow Eye. American Journal of Ophthalmology. 2011 Oct;152(4):556–67.</li>
                <li id="ref-5">Fleckenstein M, Adrion C, Schmitz-Valckenberg S, Göbel AP, Bindewald-Wittich A, Scholl HPN, et al. Concordance of Disease Progression in Bilateral Geographic Atrophy. Investigative Ophthalmology & Visual Science. 2010 Feb 1;51(2):637.</li>
                <li id="ref-6">Klein ML, Ferris FL, Francis PJ, Lindblad AS, Chew EY, Hamon SC, et al. Progression of Geographic Atrophy and Genotype in Age-Related Macular Degeneration. Ophthalmology. 2009 Jul;116(7):1400–6.</li>
                <li id="ref-7">Klein R, Klein BEK, Knudtson MD, Meuer SM, Swift M, Gangnon RE. Fifteen-Year Cumulative Incidence of Age-Related Macular Degeneration. Ophthalmology. 2007 Feb;114(2):253–62.</li>
                <li id="ref-8">Augood CA. Prevalence of Age-Related Maculopathy in Older Europeans. Archives of Ophthalmology. 2006 Apr 1;124(4):529.</li>
                <li id="ref-9">Lim LS, Mitchell P, Seddon JM, Holz FG, Wong TY. Age-related macular degeneration. The Lancet. 2012 May;379(9827):1728–38.</li>
                <li id="ref-10">Grassmann F, Fauser S, Weber BHF. The genetics of age-related macular degeneration (AMD) – Novel targets for designing treatment options? European Journal of Pharmacology. 2015 Dec;768:144–50.</li>
                <li id="ref-11">Winkler TW, Brandl C, Grassmann F, Gorski M, Stark K, Loss J, et al. Investigating the modulation of genetic effects on late AMD by age and sex: Lessons learned and future directions. Ophthalmic Genetics. 2018 Aug 8;39(4):425–32.</li>
                <li id="ref-12">Fritsche LG, Igl W, Bailey JNC, Grassmann F, Sengupta S, Bragg-Gresham JL, et al. A large genome-wide association study of age-related macular degeneration highlights contributions of rare and common variants. Nature Genetics. 2016 Feb 8;48(2):134–43.</li>
                <li id="ref-13">Grassmann F, Heid IM, Weber BHF. Recombinant Haplotypes Narrow the ARMS2/HTRA1 Association Signal for Age-Related Macular Degeneration. Genetics [Internet]. 2017 Feb;205(2):553–62.</li>
                <li id="ref-14">Gorski M, Grunin M, Herold JM, Fröhlich B, Behr M, Wheeler N, et al. Diverse ancestry GWAS for advanced age-related macular degeneration in TOPMed-imputed and Ophthalmic Genetics Consortium. Ophthalmic Genetics. 2021 Dec 9;43(1):59–71.</li>
                <li id="ref-15">Francis M, Gorman BR, Bigdeli TB, Genovese G, Voloudakis G, Bendl J, et al. Multi-ancestry genome-wide association meta-analysis of mosaic loss of chromosome Y in peripheral blood. Nat Commun. 2023 Sep 12;14(1):5625.</li>
                <li id="ref-16">Han X, Gharahkhani P, Mitchell P, Liew G, Hewitt AW, MacGregor S. Genome-wide meta-analysis identifies novel loci associated with age-related macular degeneration. Nature Genetics. 2020 Oct 5;52(10):1053–62.</li>
                <li id="ref-17">Jacobs KB, Yeager M, Zhou W, Wacholder S, Wang Z, Rodriguez-Santiago B, et al. Detectable clonal mosaicism and its relationship to aging and cancer. Nat Genet [Internet]. 2012 Jun;44(6):651–8.</li>
                <li id="ref-18">Forsberg LA. Loss of chromosome Y (LOY) in blood cells is associated with increased risk for disease and mortality in aging men. Hum Genet [Internet]. 2017 May 19;136(5):657–70.</li>
                <li id="ref-19">Thompson DJ, Genovese G, Halvardson J, Ulirsch JC, Wright DJ, Terao C, et al. Genetic predisposition to mosaic Y chromosome loss in blood. Nature [Internet]. 2019 Oct 31;575(7784):652–7.</li>
                <li id="ref-20">Noveski P, Madjunkova S, Sukarova Stefanovska E, Matevska Geshkovska N, Kuzmanovska M, Dimovski A, et al. Loss of Y Chromosome in Peripheral Blood of Colorectal and Prostate Cancer Patients. PLoS ONE [Internet]. 2016 May 2;11(5):e0154828.</li>
                <li id="ref-21">Forsberg LA, Gisselsson D, Dumanski JP. Mosaicism in health and disease — clones picking up speed. Nat Rev Genet [Internet]. 2017 Feb 12;18(2):128–42.</li>
                <li id="ref-22">Forsberg LA, Rasi C, Malmqvist N, Davies H, Pasupulati S, Pakalapati G, et al. Mosaic loss of chromosome Y in peripheral blood is associated with shorter survival and higher risk of cancer. Nat Genet [Internet]. 2014 Jun 28;46(6):624–8.</li>
            </ol>
        </div>
      ),
    },
    newsArchive: {
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
            <p className="leading-relaxed mt-1">The GATHER2 study was a Phase 3 trial that evaluated the efficacy and safety of monthly intravitreal injections of avacincaptad pegol, a C5 inhibitor, in patients with geographic atrophy. The trial showed that treatment resulted in a statistically significant slowing of GA progression compared to sham, with implications for preserving vision in affected patients.</p>
            <div className="text-xs italic text-slate-500 dark:text-slate-400 mt-2 space-y-1">
              <p><strong>Citation:</strong> Jaffe, G. J., et al. (2023). Efficacy and safety of avacincaptad pegol in patients with geographic atrophy (GATHER2)... <em>The Lancet, 402(10411)</em>, 1449-1459.</p>
              <p><strong>DOI:</strong> <a href="https://doi.org/10.1016/S0140-6736(23)01583-0" target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:underline">https://doi.org/10.1016/S0140-6736(23)01583-0</a></p>
            </div>
          </div>
          <div className="border-t border-slate-200 dark:border-slate-700"></div>
          <div>
            <h5 className="font-semibold font-sans">3. Deep-Learning Quantification of OCT in the FILLY Trial</h5>
            <p className="leading-relaxed mt-1">A post-hoc analysis of the Phase 2 FILLY trial employed a deep-learning model to analyze OCT scans, allowing for independent measurement of RPE loss and outer retinal thickening. This approach provided more precise phenotyping of disease progression in geographic atrophy.</p>
            <div className="text-xs italic text-slate-500 dark:text-slate-400 mt-2 space-y-1">
              <p><strong>Citation:</strong> Fu, D. J., et al. (2024). Deep-learning automated quantification of longitudinal OCT scans... <em>British Journal of Ophthalmology, 108(4)</em>, 536-542.</p>
              <p><strong>DOI:</strong> <a href="https://doi.org/10.1136/bjo-2022-322672" target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:underline">https://doi.org/10.1136/bjo-2022-322672</a></p>
            </div>
          </div>
          <div className="border-t border-slate-200 dark:border-slate-700"></div>
          <div>
            <h5 className="font-semibold font-sans">4. Ixo-vec (Adverum Biotechnologies) for Neovascular AMD</h5>
            <p className="leading-relaxed mt-1">Adverum is advancing its gene therapy candidate, Ixo-vec, into a large-scale Phase 3 program for wet AMD. Promising results from Phase 1 and 2 trials suggest potential for treating patients with neovascular AMD.</p>
            <div className="text-xs italic text-slate-500 dark:text-slate-400 mt-2 space-y-1">
              <p><strong>Citation:</strong> Research in late-stage clinical development (e.g., ARTEMIS, NCT06856577); peer-reviewed publication of pivotal trial results is pending.</p>
            </div>
          </div>
          <div className="border-t border-slate-200 dark:border-slate-700"></div>
          <div>
            <h5 className="font-semibold font-sans">5. GT005 (Gyroscope Therapeutics) for Geographic Atrophy</h5>
            <p className="leading-relaxed mt-1">Representing a personalized approach, GT005 is a gene therapy designed for a subset of GA patients with specific genetic risk factors. The therapy is being advanced through Phase 2 clinical trials.</p>
            <div className="text-xs italic text-slate-500 dark:text-slate-400 mt-2 space-y-1">
              <p><strong>Citation:</strong> Research is ongoing in Phase 2 clinical trials; results are anticipated in the coming years.</p>
            </div>
          </div>
          <div className="border-t border-slate-200 dark:border-slate-700"></div>
          <div>
            <h5 className="font-semibold font-sans">6. Longitudinal Dynamics and Gene-Specific Fitness of CHIP Mutations</h5>
            <p className="leading-relaxed mt-1">A pivotal study in <em>Nature Medicine</em> analyzed longitudinal blood samples to measure the growth rates of different CHIP mutations. The study found that different mutations conferred different growth advantages, suggesting gene-specific fitness effects.</p>
            <div className="text-xs italic text-slate-500 dark:text-slate-400 mt-2 space-y-1">
              <p><strong>Citation:</strong> Robertson, N. A., et al. (2022). Longitudinal dynamics of clonal hematopoiesis identifies gene-specific fitness effects. <em>Nature Medicine, 28(7)</em>, 1519-1524.</p>
              <p><strong>DOI:</strong> <a href="https://doi.org/10.1038/s41591-022-01883-3" target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:underline">https://doi.org/10.1038/s41591-022-01883-3</a></p>
            </div>
          </div>
          <div className="border-t border-slate-200 dark:border-slate-700"></div>
          <div>
            <h5 className="font-semibold font-sans">7. Cost-Effective Longitudinal Profiling of CHIP Dynamics</h5>
            <p className="leading-relaxed mt-1">A study in <em>Immunity & Ageing</em> developed a cost-effective sequencing assay to track clonal dynamics over long periods. They found that the majority of clones (52.1%) expanded over time, with a median doubling period of 7.43 years, and showed that once a clone reaches the conventional CHIP detection threshold (variant allele fraction ≥ 2%), it generally continues to grow.</p>
            <div className="text-xs italic text-slate-500 dark:text-slate-400 mt-2 space-y-1">
              <p><strong>Citation:</strong> Uddin, M. M., et al. (2022). Longitudinal profiling of clonal hematopoiesis provides insight into clonal dynamics. <em>Immunity & Ageing, 19(1)</em>, 21.</p>
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
            <p className="leading-relaxed mt-1">An EWAS in <em>Nature Communications</em> found that mutations in the two most common CHIP genes, <em>DNMT3A</em> and <em>TET2</em>, have distinct epigenetic signatures that associate with different disease phenotypes.</p>
            <div className="text-xs italic text-slate-500 dark:text-slate-400 mt-2 space-y-1">
              <p><strong>Citation:</strong> Uddin, M. M., et al. (2022). Clonal hematopoiesis of indeterminate potential, DNA methylation, and risk for coronary artery disease. <em>Nature Communications, 13</em>, 6327.</p>
              <p><strong>DOI:</strong> <a href="https://doi.org/10.1038/s41467-022-33093-3" target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:underline">https://doi.org/10.1038/s41467-022-33093-3</a></p>
            </div>
          </div>
          <div className="border-t border-slate-200 dark:border-slate-700"></div>
          <div>
            <h5 className="font-semibold font-sans">10. TP53-Mediated CHIP and Doxorubicin-Induced Cardiomyopathy</h5>
            <p className="leading-relaxed mt-1">A study in <em>JCI Insight</em> using a mouse model found that mice with <em>Trp53</em>-mutant hematopoietic cells experienced significantly worse outcomes following doxorubicin treatment, suggesting a link between CHIP and treatment-related complications.</p>
            <div className="text-xs italic text-slate-500 dark:text-slate-400 mt-2 space-y-1">
              <p><strong>Citation:</strong> Sano, S., et al. (2021). TP53-mediated therapy-related clonal hematopoiesis contributes to doxorubicin-induced cardiomyopathy... <em>JCI Insight, 6(16)</em>, e146076.</p>
              <p><strong>DOI:</strong> <a href="https://doi.org/10.1172/jci.insight.146076" target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:underline">https://doi.org/10.1172/jci.insight.146076</a></p>
            </div>
          </div>
          <div className="border-t border-slate-200 dark:border-slate-700"></div>
          <div>
            <h5 className="font-semibold font-sans">11. JAK2-Mediated CHIP Accelerates Heart Failure</h5>
            <p className="leading-relaxed mt-1">A study in <em>JACC: Basic to Translational Science</em> developed a mouse model where the <em>JAK2 V617F</em> mutation was expressed in myeloid cells, and found that this CHIP-like mutation accelerated pathological cardiac remodeling and heart failure.</p>
            <div className="text-xs italic text-slate-500 dark:text-slate-400 mt-2 space-y-1">
              <p><strong>Citation:</strong> Sano, S., et al. (2019). JAK2V617F-Mediated Clonal Hematopoiesis Accelerates Pathological Remodeling in Murine Heart Failure. <em>JACC: Basic to Translational Science, 4(5)</em>, 684-697.</p>
              <p><strong>DOI:</strong> <a href="https://doi.org/10.1016/j.jacbts.2019.05.013" target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:underline">https://doi.org/10.1016/j.jacbts.2019.05.013</a></p>
            </div>
          </div>
          <div className="border-t border-slate-200 dark:border-slate-700"></div>
          <div>
            <h5 className="font-semibold font-sans">12. Somatic Mutation as an Explanation for Epigenetic Aging</h5>
            <p className="leading-relaxed mt-1">This landmark study in <em>Nature Aging</em> discovered that a single age-related mutation event (C{'>'} T at methylated CpG sites) is associated with increases in methylation-based age (DNAm age), suggesting that somatic mutations drive epigenetic aging.</p>
            <div className="text-xs italic text-slate-500 dark:text-slate-400 mt-2 space-y-1">
              <p><strong>Citation:</strong> Koch, Z., et al. (2024). Somatic mutation as an explanation for epigenetic aging. <em>Nature Aging, 5</em>, 709-719.</p>
              <p><strong>DOI:</strong> <a href="https://doi.org/10.1038/s43587-024-00794-x" target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:underline">https://doi.org/10.1038/s43587-024-00794-x</a></p>
            </div>
          </div>
          <div className="border-t border-slate-200 dark:border-slate-700"></div>
          <div>
            <h5 className="font-semibold font-sans">13. Transcriptomic Consequences of CRISPR-Mediated Y-Chromosome Elimination</h5>
            <p className="leading-relaxed mt-1">A 2024 study in <em>Scientific Reports</em> used CRISPR/Cas9 to eliminate the Y chromosome from a human male retinal cell line. RNA-sequencing revealed that loss of the Y chromosome affected the expression of genes involved in stress responses and cellular function.</p>
            <div className="text-xs italic text-slate-500 dark:text-slate-400 mt-2 space-y-1">
              <p><strong>Citation:</strong> Celli, L., et al. (2024). CRISPR/Cas9 mediated Y-chromosome elimination affects human cells transcriptome. <em>Scientific Reports, 14(1)</em>, 2119.</p>
              <p><strong>DOI:</strong> <a href="https://doi.org/10.1038/s41598-024-53549-9" target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:underline">https://doi.org/10.1038/s41598-024-53549-9</a></p>
            </div>
          </div>
          <div className="border-t border-slate-200 dark:border-slate-700"></div>
          <div>
            <h5 className="font-semibold font-sans">14. Mosaic Loss of Y Chromosome in Brain Microglia</h5>
            <p className="leading-relaxed mt-1">A recent preprint study provided the first evidence of mosaic loss of the Y chromosome (mLOY) occurring within brain cells, specifically microglia, and explored its potential role in neurodegenerative diseases.</p>
            <div className="text-xs italic text-slate-500 dark:text-slate-400 mt-2 space-y-1">
              <p><strong>Citation:</strong> Dumanski, J. P., et al. (2021). Mosaic loss of chromosome Y in migratory human microglia and its role in Alzheimer's disease. <em>bioRxiv</em>.</p>
              <p><strong>DOI:</strong> <a href="https://doi.org/10.1101/2021.11.19.469312" target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:underline">https://doi.org/10.1101/2021.11.19.469312</a></p>
            </div>
          </div>
          <div className="border-t border-slate-200 dark:border-slate-700"></div>
          <div>
            <h5 className="font-semibold font-sans">15. A LINE-1 Element Drives Escape from X-Inactivation at KDM5C</h5>
            <p className="leading-relaxed mt-1">A study in <em>Human Molecular Genetics</em> discovered that the ability of the gene <em>KDM5C</em> to escape X-chromosome inactivation is driven by a LINE-1 element, revealing new mechanisms of mosaicism in females.</p>
            <div className="text-xs italic text-slate-500 dark:text-slate-400 mt-2 space-y-1">
              <p><strong>Citation:</strong> Balaton, B. P., et al. (2024). Escape from X-chromosome inactivation at KDM5C is driven by a LINE-1 element. <em>Human Molecular Genetics, 33(11)</em>, 937-949.</p>
              <p><strong>DOI:</strong> <a href="https://doi.org/10.1093/hmg/ddae031" target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:underline">https://doi.org/10.1093/hmg/ddae031</a></p>
            </div>
          </div>
          <div className="border-t border-slate-200 dark:border-slate-700"></div>
          <div>
            <h5 className="font-semibold font-sans">16. Causal Relationship Between Telomere Length and mtDNA Copy Number</h5>
            <p className="leading-relaxed mt-1">A 2024 study in <em>Aging</em> used bidirectional Mendelian randomization and found a significant, one-way causal effect where genetically predicted shorter telomere length increases mtDNA copy number.</p>
            <div className="text-xs italic text-slate-500 dark:text-slate-400 mt-2 space-y-1">
              <p><strong>Citation:</strong> Zhang, Y., et al. (2024). New insights from bidirectional Mendelian randomization... <em>Aging, 16(10)</em>, 8345-8356.</p>
              <p><strong>DOI:</strong> <a href="https://doi.org/10.18632/aging.205728" target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:underline">https://doi.org/10.18632/aging.205728</a></p>
            </div>
          </div>
          <div className="border-t border-slate-200 dark:border-slate-700"></div>
          <div>
            <h5 className="font-semibold font-sans">17. Maternal Age and Purifying Selection of mtDNA Mutations</h5>
            <p className="leading-relaxed mt-1">A study in <em>Nature Aging</em> showed that purifying selection, a process that removes harmful mutations, occurs during oocyte maturation to prevent the transmission of pathogenic mtDNA variants to offspring.</p>
            <div className="text-xs italic text-slate-500 dark:text-slate-400 mt-2 space-y-1">
              <p><strong>Citation:</strong> Ru, Y., et al. (2024). Maternal age enhances purifying selection on pathogenic mutations... <em>Nature Aging, 4(9)</em>, 1211-1230.</p>
              <p><strong>DOI:</strong> <a href="https://doi.org/10.1038/s43587-024-00672-6" target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:underline">https://doi.org/10.1038/s43587-024-00672-6</a></p>
            </div>
          </div>
          <div className="border-t border-slate-200 dark:border-slate-700"></div>
          <div>
            <h5 className="font-semibold font-sans">18. Dynamics of mtDNA Mosaicism in Somatic Cells</h5>
            <p className="leading-relaxed mt-1">Research in <em>Nature Communications</em> provided a comprehensive look at mtDNA mosaicism by sequencing thousands of single-cell-derived clones. The study revealed extensive cell-to-cell variation in mtDNA genotypes within tissues.</p>
            <div className="text-xs italic text-slate-500 dark:text-slate-400 mt-2 space-y-1">
              <p><strong>Citation:</strong> Ju, Y. S., et al. (2023). Mitochondrial DNA mosaicism in normal human somatic cells. <em>Nature Communications, 14(1)</em>, 1234.</p>
              <p><strong>DOI:</strong> <a href="https://doi.org/10.1038/s41467-023-36873-z" target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:underline">https://doi.org/10.1038/s41467-023-36873-z</a></p>
            </div>
          </div>
          <div className="border-t border-slate-200 dark:border-slate-700"></div>
          <div>
            <h5 className="font-semibold font-sans">19. mtDNA Replication is Essential for Neurogenesis</h5>
            <p className="leading-relaxed mt-1">A study in <em>Development Growth & Regeneration</em> found that inhibiting mtDNA replication specifically impaired the generation of new neurons (neurogenesis), highlighting the importance of mitochondrial function in neural development.</p>
            <div className="text-xs italic text-slate-500 dark:text-slate-400 mt-2 space-y-1">
              <p><strong>Citation:</strong> Hroudová, J., et al. (2024). Mitochondrial DNA replication is essential for neurogenesis... <em>Development, Growth & Differentiation</em>.</p>
              <p><strong>DOI:</strong> <a href="https://doi.org/10.1111/dgd.12903" target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:underline">https://doi.org/10.1111/dgd.12903</a></p>
            </div>
          </div>
          <div className="border-t border-slate-200 dark:border-slate-700"></div>
          <div>
            <h5 className="font-semibold font-sans">20. Mitochondrial Nucleotide Transport and Metabolism</h5>
            <p className="leading-relaxed mt-1">A review in <em>Cell Metabolism</em> highlights the complex mechanisms that supply mitochondria with nucleotides for mtDNA replication. Disturbances in these pathways may contribute to disease development.</p>
            <div className="text-xs italic text-slate-500 dark:text-slate-400 mt-2 space-y-1">
              <p><strong>Citation:</strong> Van der Verren, S. E., et al. (2024). High tide or low tide: the transport and metabolism of mitochondrial nucleotides. <em>Cell Metabolism, 36(8)</em>, 1583-1595.</p>
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
            I am Anastasios Papadam, a researcher from Athens, Greece, specializing in genetic epidemiology and the role of mosaicism in age-related diseases.
          </p>
          <p className="leading-relaxed">
            I completed a five-year integrated Master's (M.Sci.) in Genetics, specializing in Immunology and Biobusiness, at the University of Aberdeen, Scotland, which included a key industrial placement. I then completed my PhD at the University of Aberdeen, where my research focused on the influence of mosaicism in age-related macular degeneration (AMD), with particular emphasis on somatic chromosomal abundance and its role in disease risk and prognosis.
          </p>
          <p className="leading-relaxed">
            During my doctoral studies, my interests expanded to include the interconnected fields of biological ageing and how patients with AMD may exhibit differential organ ageing. I am now actively seeking a postdoctoral position where I can apply my skills in genetic epidemiology, continue advancing the understanding of mosaicism in age-related diseases, and contribute to new discoveries in the field.
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
            As a member of The Grassmann Lab, my research contributes to our group's primary mission: to unravel the complex genetic architecture of inherited diseases and understand how genetic variants influence disease manifestation and severity.
          </p>
          <p className="leading-relaxed">
            We investigate the genetic connections between different diseases, searching for shared pathways that might reveal new treatment opportunities. A key focus is on less-explored genetic variants and their functional significance in disease biology.
          </p>
          <div>
            <h4 className="font-semibold mb-2">Official Profiles:</h4>
            <ul className="list-disc list-inside space-y-1">
              <li><a href="https://ki.se/en/people/felix-grassmann" target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:underline">Karolinska Institutet Profile</a></li>
              <li><a href="https://www.health-and-medical-university.de/ueber-uns-2/team/team-fakultaet-medizin/prof-dr-felix-grassmann/" target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:underline">Medical University Profile</a></li>
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
            <h3 className="font-semibold text-slate-800 dark:text-slate-100">Placement Student, BSRC "Alexander Fleming", Vari, Attica, Greece</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">Sep 2019–Aug 2020</p>
            <p className="text-sm italic mb-2">Project: Establishment of a novel PBL‑NSG model to induce primary/secondary T‑cell responses against lung cancer patient‑derived grafts</p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Cell culture (A549), staining and FACS; work with human lung tissues and experimental animals; quantitative image analysis (ImageJ).</li>
            </ul>
          </div>
        </div>
      )
    },
    boards: {
      id: 'boards',
      title: 'Boards Participation',
      icon: <ShieldCheckIcon />,
      content: (
        <div className="space-y-6 max-h-[65vh] overflow-y-auto pr-2">
          <div>
            <h3 className="font-semibold text-slate-800 dark:text-slate-100">Member, School of Medicine, Medical Sciences and Nutrition Ethics Review Board (SERB), University of Aberdeen, UK</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">April 2023 – Present</p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Evaluated research proposals from staff and students within the School of Medicine, Medical Sciences, and Nutrition.</li>
              <li>Assessed research protocols involving human participants or biological samples to ensure compliance with university governance and ethical standards.</li>
              <li>Analyzed potential risks to human participants, ensuring appropriate informed consent procedures and data protection safeguards were in place.</li>
              <li>Contributed to board decisions to approve, require modifications for, or withhold approval for research studies.</li>
            </ul>
          </div>
        </div>
      )
    },
    news: {
      id: 'news',
      title: 'Monthly Research Insights',
      icon: <NewsIcon />,
      content: <InsightsDigest />,
    },
  };

  const navLinks = [
    { id: 'research', label: 'Research' },
    { id: 'experience', label: 'Experience' },
    { id: 'boards', label: 'Boards' },
    { id: 'news', label: 'Insights' },
    { id: 'publications', label: 'Publications' },
    { id: 'packages', label: 'Packages' },
    { id: 'tutorials', label: 'Tutorials' },
    { id: 'lab', label: 'Lab'},
    { id: 'about', label: 'About' },
  ];

  const closeModal = () => setActiveModal(null);

  const handleNavigation = (id: string) => {
    if (id === 'tutorials' || id === 'packages') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    setActiveModal(id);
  };

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
    <div className="site-shell">
      <div className="site-container">
        <header className="site-header glass-panel">
          <a href="#top" className="brand-mark" aria-label="Anastasios Papadam home">
            <span className="brand-orb">
              <AcademicCapIcon className="w-5 h-5" />
            </span>
            <span>
              <span className="brand-name">Anastasios Papadam</span>
              <span className="brand-role">Genetic epidemiology</span>
            </span>
          </a>

          <nav className="desktop-nav" aria-label="Main navigation">
            {navLinks.map(link => (
              <button key={link.id} onClick={() => handleNavigation(link.id)} className="nav-button">
                {link.label}
              </button>
            ))}
          </nav>

          <button onClick={toggleDarkMode} className="theme-toggle" aria-label="Toggle color theme">
            {isDarkMode ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
          </button>
        </header>

        <main id="top">
          <section className="hero" aria-labelledby="hero-title">
            <div className="hero-content">
              <div className="hero-intro">
                <p className="eyebrow"><span className="eyebrow-dot" /> Open to postdoctoral opportunities</p>
                <p className="hero-kicker">PhD in genetic epidemiology</p>
                <h1 id="hero-title" className="hero-title">
                  Decoding <span className="gradient-text">ageing.</span> Saving <span className="gradient-text">sight.</span>
                </h1>
                <p className="hero-copy">
                  I study how mosaicism, genetic variation, and biological ageing shape
                  age-related macular degeneration and other complex diseases. By translating
                  population-scale genomic and phenotypic data into biological insight, I aim
                  to uncover shared mechanisms of disease risk and progression across retinal,
                  systemic, and age-related conditions.
                </p>
                <div className="hero-actions">
                  <button onClick={() => setActiveModal('research')} className="primary-button">
                    Explore my research <span aria-hidden="true">&rarr;</span>
                  </button>
                  <a href="mailto:a.papadam@hotmail.com" className="secondary-button">
                    <MailIcon className="w-4 h-4" /> Start a conversation
                  </a>
                </div>
                <div className="hero-tags" aria-label="Research methods and interests">
                  <span className="data-tag">MOSAICISM</span>
                  <span className="data-tag">AMD</span>
                  <span className="data-tag">GWAS</span>
                  <span className="data-tag">BIOLOGICAL AGEING</span>
                  <span className="data-tag">MACHINE LEARNING</span>
                </div>
              </div>

              <section className="metrics-strip glass-panel" aria-label="Career highlights">
                <div className="metric"><span className="metric-value">3</span><span className="metric-label">2025 publications</span></div>
                <div className="metric"><span className="metric-value">PhD</span><span className="metric-label">University of Aberdeen</span></div>
                <div className="metric"><span className="metric-value">3</span><span className="metric-label">Countries of experience</span></div>
                <div className="metric"><span className="metric-value">4+</span><span className="metric-label">Research programmes</span></div>
              </section>
            </div>

            <GenomeSystemsVisual />
          </section>

          <section id="research-focus" className="page-section">
            <div className="section-heading">
              <div>
                <span className="section-index">01 / Research focus</span>
                <h2 className="section-title">From genetic signal to biological meaning.</h2>
              </div>
              <p className="section-copy">
                My work connects large-scale genomic evidence with clinically relevant
                questions in retinal health, disease progression, and healthy ageing.
              </p>
            </div>

            <div className="focus-grid">
              <article className="focus-card focus-card-primary">
                <span className="card-number">R / 01</span>
                <h3>Mosaicism in macular degeneration</h3>
                <p>
                  Investigating somatic chromosomal abundance and mosaic loss of the
                  Y chromosome as potential drivers of AMD risk, lesion growth, and prognosis.
                </p>
                <button onClick={() => setActiveModal('research')} className="card-link" aria-label="Read about mosaicism research">+</button>
              </article>
              <article className="focus-card focus-card-secondary">
                <span className="card-number">R / 02</span>
                <h3>Biological ageing</h3>
                <p>Mapping differential organ ageing to retinal disease and systemic health.</p>
                <button onClick={() => setActiveModal('research')} className="card-link" aria-label="Read about biological ageing research">+</button>
              </article>
              <article className="focus-card focus-card-secondary">
                <span className="card-number">R / 03</span>
                <h3>Predictive genomics</h3>
                <p>Using genetic risk scores and machine learning to model disease outcomes.</p>
                <button onClick={() => setActiveModal('research')} className="card-link" aria-label="Read about predictive genomics research">+</button>
              </article>
            </div>
          </section>

          <section id="publications" className="page-section">
            <div className="section-heading">
              <div>
                <span className="section-index">02 / Selected work</span>
                <h2 className="section-title">Latest peer-reviewed research.</h2>
              </div>
              <button onClick={() => setActiveModal('publications')} className="secondary-button">
                Publications and conferences
              </button>
            </div>

            <div className="publication-list glass-panel">
              {publications.map((pub) => (
                <a
                  key={pub.doi}
                  href={pub.doi ? `https://doi.org/${pub.doi}` : '#publications'}
                  target={pub.doi ? '_blank' : undefined}
                  rel={pub.doi ? 'noopener noreferrer' : undefined}
                  className="publication-row"
                >
                  <span className="publication-year">{pub.year}</span>
                  <span className="publication-title">{pub.title}</span>
                  <span className="publication-journal">{pub.journal}<br />{pub.authors}</span>
                  <span className="publication-arrow" aria-hidden="true">{'\u2197'}</span>
                </a>
              ))}
            </div>
          </section>

          <section id="experience" className="page-section">
            <div className="section-heading">
              <div>
                <span className="section-index">03 / Profile</span>
                <h2 className="section-title">Research built across disciplines.</h2>
              </div>
              <p className="section-copy">
                Genetics, epidemiology, imaging, machine learning, and ethical review,
                connected by one aim: research that improves human health.
              </p>
            </div>

            <div className="experience-layout">
              <article className="profile-panel glass-panel">
                <div>
                  <div className="profile-monogram">AP</div>
                  <h3>Anastasios Papadam</h3>
                  <p>
                    Researcher from Athens, Greece, with an integrated Master's in
                    Genetics and a PhD focused on mosaicism in age-related macular degeneration.
                  </p>
                </div>
                <div>
                  <div className="profile-links">
                    <a href="https://www.linkedin.com/in/anastasios-papadam-11b432146" target="_blank" rel="noopener noreferrer" className="profile-link"><LinkedinIcon className="w-4 h-4" /> LinkedIn</a>
                    <a href="https://orcid.org/0000-0002-6780-6311" target="_blank" rel="noopener noreferrer" className="profile-link"><OrcidIcon className="w-4 h-4" /> ORCID</a>
                    <a href="https://www.researchgate.net/profile/Anastasios-Papadam-2" target="_blank" rel="noopener noreferrer" className="profile-link"><ResearchGateIcon className="w-4 h-4" /> ResearchGate</a>
                  </div>
                  <button onClick={() => setActiveModal('about')} className="primary-button mt-4">Full profile</button>
                </div>
              </article>

              <article className="timeline-panel glass-panel">
                <div className="timeline-item">
                  <span className="timeline-date">2024</span>
                  <div className="timeline-content">
                    <h3>Genentech</h3>
                    <span>Research Intern / California, US</span>
                    <p>Genome-wide association studies connecting image-derived phenotypes with genetic variants and functional evidence.</p>
                  </div>
                </div>
                <div className="timeline-item">
                  <span className="timeline-date">PhD</span>
                  <div className="timeline-content">
                    <h3>University of Aberdeen</h3>
                    <span>Genetic Epidemiology / Scotland, UK</span>
                    <p>Doctoral research on somatic chromosomal mosaicism, AMD risk, geographic atrophy progression, and biological ageing.</p>
                  </div>
                </div>
                <div className="timeline-item">
                  <span className="timeline-date">2023-now</span>
                  <div className="timeline-content">
                    <h3>Ethics Review Board</h3>
                    <span>School of Medicine, Medical Sciences and Nutrition</span>
                    <p>Reviewing research governance, participant risk, informed consent, and data protection safeguards.</p>
                  </div>
                </div>
                <button onClick={() => setActiveModal('experience')} className="secondary-button">View complete experience</button>
              </article>
            </div>

            <div className="support-grid">
              <article className="support-card glass-panel">
                <div>
                  <h3>The Grassmann Lab</h3>
                  <p>Genetic architecture, shared disease pathways, and functional variants.</p>
                </div>
                <button onClick={() => setActiveModal('lab')} className="card-link static" aria-label="Learn about the Grassmann Lab">+</button>
              </article>
              <article className="support-card glass-panel">
                <div>
                  <h3>Fight for Sight</h3>
                  <p>PhD research supported by the UK's leading eye research charity.</p>
                </div>
                <button onClick={() => setActiveModal('funder')} className="card-link static" aria-label="Learn about the research funder">+</button>
              </article>
            </div>
          </section>

          <section id="packages" className="page-section packages-section">
            <div className="packages-panel glass-panel">
              <div className="packages-heading">
                <div>
                  <span className="section-index">04 / Software packages</span>
                  <p className="tutorials-status"><span className="eyebrow-dot" /> In development</p>
                  <h2 className="section-title">Research tools, built to be reused.</h2>
                </div>
                <p className="section-copy">
                  I am developing open and reproducible software packages for genetic
                  epidemiology. More information will be shared as they approach release.
                </p>
              </div>

              <div className="packages-coming-soon" aria-label="Software packages coming soon">
                <div className="package-orbit" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
                <div>
                  <span className="package-coming-label">Upcoming releases</span>
                  <h3>Software packages are coming soon.</h3>
                  <p>Package names, documentation, and source-code links will appear here at a later date.</p>
                </div>
              </div>
            </div>
          </section>

          <section id="tutorials" className="page-section tutorials-section">
            <div className="tutorials-panel glass-panel">
              <div className="tutorials-copy">
                <span className="section-index">05 / Tutorials</span>
                <p className="tutorials-status"><span className="eyebrow-dot" /> Knowledge hub in development</p>
                <h2 className="section-title">Practical science, explained clearly.</h2>
                <p className="section-copy">
                  This space will host future tutorials, research workflows, and accessible
                  guides for working with genetic and epidemiological data.
                </p>
              </div>

              <div className="tutorials-preview" aria-label="Upcoming tutorial formats">
                <article className="tutorial-placeholder">
                  <span>01</span>
                  <strong>Step-by-step guides</strong>
                  <small>Coming soon</small>
                </article>
                <article className="tutorial-placeholder">
                  <span>02</span>
                  <strong>Code and workflows</strong>
                  <small>Coming soon</small>
                </article>
                <article className="tutorial-placeholder">
                  <span>03</span>
                  <strong>Research explainers</strong>
                  <small>Coming soon</small>
                </article>
              </div>
            </div>
          </section>
        </main>

        <footer className="site-footer">
          <p>&copy; {new Date().getFullYear()} Anastasios Papadam.</p>
          <div className="footer-links">
            <a href="mailto:a.papadam@hotmail.com" title="Email"><MailIcon className="w-4 h-4" /></a>
            <a href="https://www.linkedin.com/in/anastasios-papadam-11b432146" target="_blank" rel="noopener noreferrer" title="LinkedIn"><LinkedinIcon className="w-4 h-4" /></a>
            <a href="https://orcid.org/0000-0002-6780-6311" target="_blank" rel="noopener noreferrer" title="ORCID"><OrcidIcon className="w-4 h-4" /></a>
          </div>
        </footer>
      </div>
      {renderModal()}
    </div>
  );
};

export default App;
