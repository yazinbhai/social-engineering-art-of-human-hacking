// Social Engineering: The Art of Human Hacking — Interactive Activities Dataset
// Covering all 9 Chapters with Interactive Simulators, Persona Architects, and Security Audits

export const ALL_ACTIVITIES = {
  // CHAPTER 1
  "ch1-se-mindset-audit": {
    id: "ch1-se-mindset-audit",
    chapterId: 1,
    title: "Human Attack Surface Diagnostic: How Hackable Is Your Culture?",
    badge: "Chapter 1 Audit",
    type: "se-mindset-audit",
    description: "Benchmark your organizational human security posture against the 6 core psychological vulnerabilities exploited by social engineers.",
    vectors: [
      { id: "tailgating", label: "Tailgating & Door Courtesy", question: "Do employees habitually hold secured doors open for strangers carrying boxes or coffees without verifying badges?", weight: 20 },
      { id: "authority", label: "Fear of Questioning Authority", question: "If a caller claims to be the CEO or an FBI cyber agent demanding immediate wire or password bypass, do staff comply out of fear?", weight: 25 },
      { id: "helpfulness", label: "Exploiting Natural Helpfulness", question: "Do receptionists and helpdesk personnel freely give out internal names, extensions, and software vendors when someone sounds distressed?", weight: 15 },
      { id: "trash", label: "Trash & Shredding Hygiene", question: "Are internal memos, schedules, notes, or printed emails ever discarded in standard unlocked recycling bins instead of cross-cut shredders?", weight: 15 },
      { id: "verification", label: "Lack of Out-of-Band Verification", question: "Can an employee request an MFA reset or phone number update without an independent supervisor call-back?", weight: 15 },
      { id: "social_media", label: "Oversharing on Social Media", question: "Do staff post photos of their workplace desks with visible ID badges, sticky notes, or computer monitors on LinkedIn/Instagram?", weight: 10 }
    ],
    debrief: "Social engineering succeeds because it hacks the software running inside human brains: trust, empathy, and fear. Building defensive awareness is the only firewall that works."
  },

  // CHAPTER 2
  "ch2-osint-footprint-lab": {
    id: "ch2-osint-footprint-lab",
    chapterId: 2,
    title: "OSINT Target Footprinting Simulator",
    badge: "Chapter 2 Lab",
    type: "osint-footprint-lab",
    description: "Inspect open source intelligence sources (Job listings, corporate filings, social media, trash) to reconstruct a target company's attack surface.",
    intelSources: [
      {
        source: "Public IT Job Postings",
        finding: "'Seeking SysAdmin with 3+ yrs configuring Cisco ASA 5525 firewalls, VMware ESXi 7.0, and Office 365 Hybrid on Windows Server 2019.'",
        intelGained: "Exact internal firewall vendor, hypervisor version, email provider, and OS versions. Attacker now knows which CVE exploits and phish lures to target."
      },
      {
        source: "Executive Assistant's LinkedIn",
        finding: "'Excited to accompany our VP of Finance to the annual Geneva FinTech Summit from Nov 12-16!'",
        intelGained: "Specific window of executive absence. Ideal timeline for launching spear-phishing wire requests while the VP is in transit and out of communication."
      },
      {
        source: "Recycling Dumpster Behind Branch",
        finding: "Discarded vendor packing slip from 'Apex Janitorial Services' with internal account #88492 and contact person 'Marcus Wells'.",
        intelGained: "Legitimate third-party vendor name and account code to build an unassailable physical pretext for evening building entry."
      },
      {
        source: "Social Media Employee Photo",
        finding: "An employee smiling in front of the lobby with their company access badge dangling clearly on a lanyard.",
        intelGained: "High-resolution photo of the RFID badge layout, color scheme, company logo, and barcode format for rapid counterfeit badge cloning."
      }
    ],
    debrief: "No information is useless. Social engineers assemble seemingly innocent crumbs from public records to construct deadly, high-credibility attacks."
  },

  // CHAPTER 3
  "ch3-elicitation-simulator": {
    id: "ch3-elicitation-simulator",
    chapterId: 3,
    title: "Conversational Elicitation Gambits Simulator",
    badge: "Chapter 3 Simulator",
    type: "elicitation-simulator",
    description: "Master Christopher Hadnagy's 4 core conversational extraction techniques: Deliberate False Statement, Flattery, Quid Pro Quo, and Artificial Time Constraints.",
    gambits: [
      {
        id: "false_statement",
        name: "Deliberate False Statement",
        concept: "Exploit the irresistible human ego drive to correct someone who is factually wrong.",
        badDirectAsk: "'What firewall and intrusion detection systems do you run in your datacenter?' (Raises instant red flags)",
        elicitationGambit: "'Man, a government contractor like you guys probably still runs those clunky old Netgear routers from 2004, right?'",
        targetResponse: "'Are you kidding me? We just deployed redundant Fortinet FortiGate 600E enterprise clusters with real-time IPS!'"
      },
      {
        id: "flattery",
        name: "Flattery & Ego Feeding",
        concept: "Elevate the target to expert status so they boast technical architecture to maintain prestige.",
        badDirectAsk: "'How does your load balancer handle sudden DDoS traffic spikes?'",
        elicitationGambit: "'Everyone in our local DevOps group knows you are the undisputed wizard of high-availability scaling. How on earth do you manage multi-region failover without dropping packets?'",
        targetResponse: "'Ha, well it took a lot of late nights! We route through Cloudflare Edge workers and keep cold backup clusters in AWS us-east-2...'"
      },
      {
        id: "quid_pro_quo",
        name: "Quid Pro Quo (Reciprocal Sharing)",
        concept: "Give away a minor or fabricated secret first to trigger psychological obligation to reciprocate.",
        badDirectAsk: "'What accounting software does your HR department use?'",
        elicitationGambit: "'Ugh, our management just migrated us to SAP and the payroll workflow is a complete trainwreck. Does your team have to suffer through SAP too?'",
        targetResponse: "'Oh man, we used to! But our leadership switched everyone over to Workday last quarter and the self-service portal is night and day.'"
      },
      {
        id: "time_constraint",
        name: "Artificial Time Constraint",
        concept: "Lower the target's suspicion by announcing you must leave immediately, ensuring them you aren't an interrogator.",
        badDirectAsk: "'Can you walk me through your internal ticketing and badge policies?'",
        elicitationGambit: "'Hey, I only have 90 seconds before my boarding group is called at gate B12, but quick question—does your office use the mobile NFC passes or the physical blue fobs?'",
        targetResponse: "'Oh, we still have the physical blue HID fobs, but they're testing the phone app next month. Have a safe flight!'"
      }
    ],
    debrief: "Elicitation works because it feels like a friendly, mutual conversation. Never ask direct questions when a conversational gambit can make the target volunteer the answer."
  },

  // CHAPTER 4
  "ch4-pretext-architect": {
    id: "ch4-pretext-architect",
    chapterId: 4,
    title: "Pretexting Persona & Scenario Architect",
    badge: "Chapter 4 Studio",
    type: "pretext-architect",
    description: "Design and stress-test a believable undercover pretext persona with authentic props, realistic jargon, and emergency escape routes.",
    pretexts: [
      {
        id: "hvac",
        role: "HVAC & Environmental Control Technician",
        context: "Entering server rooms and telecom closets during business hours.",
        wardrobe: "Dark blue work polo with generic embroidered service badge, steel-toed boots, heavy tool belt, digital infrared thermometer.",
        props: ["Clip-on digital temperature sensor", "Clipboard with realistic air-flow inspection checklist", "Toolbox with multimeter"],
        jargon: ["CFM airflow", "differential pressure drop", "hot-aisle containment", "compressor loop"],
        escapePlan: "'The ambient sensor readings are within spec; I need to grab the specialized refrigerant gauge from my van outside.'"
      },
      {
        id: "auditor",
        role: "Third-Party Regulatory Compliance Auditor",
        context: "Interviewing employees and reviewing printed records in office environments.",
        wardrobe: "Sharp business casual: blazer, slacks, lanyard with laminated guest visitor badge, leather folio.",
        props: ["Tablet with formal checklist app", "Printed corporate compliance notification letter", "Business cards"],
        jargon: ["SOC-2 Type II controls", "PII data classification", "segregation of duties", "retention schedules"],
        escapePlan: "'I have everything needed for this sampling section; I need to brief the executive committee in conference room B.'"
      },
      {
        id: "courier",
        role: "Urgent VIP Courier / Floral Delivery",
        context: "Bypassing main security desks and tailgating through access turnstiles.",
        wardrobe: "Bright delivery vest, cap, running sneakers, wireless earbud in one ear.",
        props: ["Bulky oversized box requiring two hands", "Fragile stickers", "Digital delivery signature scanner / smartphone"],
        jargon: ["Priority-1 direct dispatch", "recipient signature required", "consignee tracking #"],
        escapePlan: "'Recipient isn't at their desk; I have to return this parcel to dispatch for rescheduling.'"
      }
    ],
    debrief: "Never pretend to be someone whose knowledge you cannot defend. Pick personas where technical ignorance is natural (courier, inspector, intern) rather than pretending to be the lead cryptographer."
  },

  // CHAPTER 5
  "ch5-human-buffer-overflow-lab": {
    id: "ch5-human-buffer-overflow-lab",
    chapterId: 5,
    title: "The Human Buffer Overflow Simulator",
    badge: "Chapter 5 Lab",
    type: "human-buffer-overflow-lab",
    description: "Experience how sensory overload, rapid-fire stimuli, and emotional urgency crash System 2 analytical thinking and force System 1 automatic compliance.",
    stimuli: [
      { id: "urgency", name: "High-Stress Urgency", desc: "'Our cloud database is wiping out in 4 minutes unless this bypass code is validated right now!'" },
      { id: "physical_load", name: "Physical Burden / Sensory Distraction", desc: "Attacker carrying a precarious, wobbling tower of heavy boxes with hot coffees balanced on top." },
      { id: "authority_drop", name: "Authority Threat / Name Dropping", desc: "'I am on direct speaker with Vice President Sterling and he is screaming for this report!'" },
      { id: "distraction_chaos", name: "Auditory Chaos / Dropped Items", desc: "Dropping a noisy ring of 50 keys and a ringing cell phone onto the security desk floor simultaneously." }
    ],
    debrief: "When human working memory exceeds 7±2 pieces of information, the rational cognitive buffer crashes. Targets default to the lowest-energy action: opening the door or clicking the link to make the chaos stop."
  },

  // CHAPTER 6
  "ch6-influence-weapons-lab": {
    id: "ch6-influence-weapons-lab",
    chapterId: 6,
    title: "Cialdini's 6 Weapons of Influence Matrix",
    badge: "Chapter 6 Matrix",
    type: "influence-weapons-lab",
    description: "Explore how Dr. Robert Cialdini's 6 universal influence principles are weaponized by social engineers—and how to deploy cognitive shields against them.",
    weapons: [
      {
        name: "Reciprocity",
        trigger: "Deep psychological obligation to return a favor or gift.",
        seAttack: "Attacker brings premium Starbucks drinks and fresh pastries for the front-desk security guards before asking for a temporary visitor badge without ID.",
        defenseShield: "Accept gifts graciously if company policy allows, but strictly separate personal gratitude from physical security verification protocols."
      },
      {
        name: "Scarcity",
        trigger: "Fear of missing out on an expiring opportunity or urgent window.",
        seAttack: "'This security credential portal re-enrollment closes at 5:00 PM today. If you don't input your password now, your account will be locked all weekend.'",
        defenseShield: "Any request involving artificial deadlines or immediate penalties is an automatic red flag. Stop and verify through official channels."
      },
      {
        name: "Authority",
        trigger: "Deep-seated conditioning to comply with symbols of power and status.",
        seAttack: "Caller posing as 'General Counsel' or 'VP of Internal Audit' demanding immediate wire transfer authorization for a secret overseas acquisition.",
        defenseShield: "Legitimate executives respect corporate compliance. Real authority will never object to an out-of-band verification call."
      },
      {
        name: "Consistency & Commitment",
        trigger: "Desire to act in alignment with previously stated values or minor commitments.",
        seAttack: "Attacker gets employee to agree to 3 harmless survey questions about office ergonomics, then slides in questions about workstation login policies.",
        defenseShield: "Be mindful of 'Foot-in-the-Door' escalation. Re-evaluate every single request on its own merits, regardless of prior agreements."
      },
      {
        name: "Liking & Similarity",
        trigger: "We say yes to people we like, admire, or perceive as similar to ourselves.",
        seAttack: "Attacker notices target's sports team lanyard and spends 10 minutes passionately discussing their recent playoff win before asking for a file transfer.",
        defenseShield: "Enjoy pleasant banter, but maintain professional boundaries when corporate data or physical credentials are requested."
      },
      {
        name: "Social Proof / Consensus",
        trigger: "Looking to the actions of peers to determine appropriate behavior in uncertainty.",
        seAttack: "'Everyone in the engineering wing already installed this browser extension this morning; your team is the only one pending.'",
        defenseShield: "Never assume an action is safe because 'everyone else did it.' Verify software deployments directly with IT change control."
      }
    ],
    debrief: "Influence weapons are hardwired into human evolutionary biology. Understanding their mechanisms transforms subconscious vulnerabilities into conscious defense perimeters."
  },

  // CHAPTER 7
  "ch7-se-toolkit-explorer": {
    id: "ch7-se-toolkit-explorer",
    chapterId: 7,
    title: "Physical & Digital Social Engineering Weaponry",
    badge: "Chapter 7 Arsenal",
    type: "se-toolkit-explorer",
    description: "Inspect the hardware gadgets, bypass tools, and software frameworks utilized by professional red-team human hackers.",
    tools: [
      {
        category: "Physical Entry",
        name: "Under-The-Door Tool (UTDT)",
        use: "A specialized flexible metal wire designed to slip under an exterior door and hook the interior emergency lever handle, popping the latch from outside in 3 seconds.",
        countermeasure: "Install commercial door sweeps, threshold plates, and lever handle shrouds that block under-door access."
      },
      {
        category: "Physical Entry",
        name: "Bump Keys & Latch Shims",
        use: "Specially cut keys and spring-steel shims that exploit kinetic pin-tumbler physics or slip unshielded latch bolts without leaving forensic marks.",
        countermeasure: "Deploy high-security pick-resistant lock cylinders (e.g. Medeco, Mul-T-Lock) with deadlocking latch bolts and strike-plate shields."
      },
      {
        category: "Hardware Surveillance",
        name: "Covert 125kHz / 13.56MHz RFID Cloner",
        use: "A battery-powered card reader hidden in a messenger bag or jacket sleeve that clones employee proximity cards from up to 3 feet away in hallways or elevators.",
        countermeasure: "Mandate RFID-blocking badge sleeves and upgrade from legacy unencrypted 125kHz proximity cards to encrypted multi-factor smart cards."
      },
      {
        category: "Digital Recon & Phishing",
        name: "Social-Engineer Toolkit (SET) & Maltego",
        use: "Open-source frameworks that automate spear-phishing web clones, credential harvesting, malicious USB payload generation, and entity OSINT relationship graphing.",
        countermeasure: "Deploy hardware FIDO2 / U2F security keys (YubiKeys) that are cryptographically immune to reverse-proxy phishing and web clones."
      }
    ],
    debrief: "Tools do not replace social engineering; they amplify it. The most sophisticated gadget is useless without a believable pretext to get within range."
  },

  // CHAPTER 8
  "ch8-case-study-dissector": {
    id: "ch8-case-study-dissector",
    chapterId: 8,
    title: "Mitnick & Hadnagy Historic Case Studies Dissector",
    badge: "Chapter 8 Case Lab",
    type: "case-study-dissector",
    description: "Deconstruct legendary real-world social engineering operations step by step to uncover how targets were manipulated and where defenses collapsed.",
    cases: [
      {
        id: "mitnick_dmv",
        title: "Kevin Mitnick: Hacking the California DMV",
        target: "California Department of Motor Vehicles Field Office",
        objective: "Obtain an unredacted confidential driver's license photo of a specific target.",
        vector: "Phone vishing with authority pretext and law enforcement jargon.",
        breakdown: [
          "Mitnick placed a call to a local DMV field office, posing as an investigator from another state agency.",
          "He spoke in crisp, impatient law enforcement cadence, quoting internal DMV form numbers and bureau codes.",
          "He established extreme urgency, claiming an active suspect tracking warrant was waiting on the photo.",
          "The DMV clerk apologized for the delay, printed the photo, and transmitted it to an off-site fax machine."
        ],
        defenseLesson: "Government agencies must mandate strict cryptographic authentication and automated ticketing verification before transmitting PII, regardless of caller status."
      },
      {
        id: "hadnagy_ceo",
        title: "Hadnagy: Infiltrating the Overconfident CEO's Boardroom",
        target: "Headquarters of a Fortune 500 Financial Firm",
        objective: "Gain physical access to the executive boardroom and plant an audit proof marker on the CEO's personal laptop.",
        vector: "Charity coordinator pretext with customized commemorative plaque.",
        breakdown: [
          "Hadnagy conducted OSINT reconnaissance and discovered the CEO was a passionate supporter of a local children's foundation.",
          "He showed up dressed in a coordinated charity blazer carrying a framed, engraved gratitude plaque for the CEO.",
          "The CEO's executive assistant was delighted, welcomed him past physical security turnstiles, and offered him coffee.",
          "She left Hadnagy alone in the private boardroom for 20 minutes while she looked for the CEO, granting full unsupervised access."
        ],
        defenseLesson: "Never allow unvetted guests unescorted access to executive or technical quarters, regardless of how friendly or prestigious the visit appears."
      }
    ],
    debrief: "Across every case study, the common thread is psychological manipulation. Attackers do not brute-force locks; they persuade authorized insiders to unlock the doors for them."
  },

  // CHAPTER 9
  "ch9-defense-auditor": {
    id: "ch9-defense-auditor",
    chapterId: 9,
    title: "Human Firewall Policy & Verification Script Generator",
    badge: "Chapter 9 Defense",
    type: "defense-auditor",
    description: "Generate bulletproof out-of-band verification procedures and security response scripts for frontline personnel.",
    scripts: [
      {
        scenario: "Suspicious Incoming Call Claiming to be IT / Helpdesk",
        policy: "Mandatory Out-of-Band Call-Back Protocol",
        script: "'Company security policy requires me to verify all remote assistance requests through our internal directory. I will hang up now and call you back via the official IT extension listed on the intranet. Thank you for helping keep our network secure.'"
      },
      {
        scenario: "Stranger Attempting to Tailgate Through a Secured Door",
        policy: "Polite Badge Challenge & Escort Rule",
        script: "'Hi there! Security policy requires every person to badge in individually so the access system maintains an accurate headcount. If you forgot your badge, I would be happy to walk with you to the visitor registration desk in the main lobby.'"
      },
      {
        scenario: "Urgent Wire Transfer Request from 'CEO' via Email or Phone",
        policy: "Dual-Control Financial Authorization",
        script: "'Financial compliance protocols prohibit unilateral wire transfers without pre-established out-of-band video or dual-signoff authorization. I will hold this transaction and contact the CFO directly through our pre-verified secondary channel.'"
      }
    ],
    debrief: "Clear, rehearsed scripts eliminate the hesitation that social engineers exploit. When employees have permission to pause and verify, attacks stop dead in their tracks."
  }
};
