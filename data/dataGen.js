/**
 * MIT License
 *
 * Copyright (c) 2019-2023 WenyanLiu (https://github.com/WenyanLiu/CCFrank4dblp)
 */

const ccfRankList =
  "C\t3DV\tInternational Conference on 3D Vision\t/conf/3dim\t/conf/3dim/3dim\n" +
  "C\tDIS\tACM SIGCHI Conference on Designing Interactive Systems\t/conf/ACMdis\t/conf/ACMdis/ACMdis\n" +
  "C\tIEEE CLOUD\tIEEE International Conference on Cloud Computing\t/conf/IEEEcloud\t/conf/IEEEcloud/IEEEcloud\n" +
  "B\tPACT\tInternational Conference on Parallel Architectures and Compilation Techniques\t/conf/IEEEpact\t/conf/IEEEpact/IEEEpact\n" +
  "C\tSSE\tIEEE International Conference on Software Services Engineering\t/conf/IEEEscc\t/conf/IEEEscc/scc\n" +
  "A\tAAAI\tAAAI Conference on Artificial Intelligence\t/conf/aaai\t/conf/aaai/aaai\n" +
  "C\tACCV\tAsian Conference on Computer Vision\t/conf/accv\t/conf/accv/accv\n" +
  "C\tACISP\tAustralasia Conference on Information Security and Privacy\t/conf/acisp\t/conf/acisp/acisp\n" +
  "A\tACL\tAnnual Meeting of the Association for Computational Linguistics\t/conf/acl\t/conf/acl/acl\n" +
  "C\tIDC\tACM Interaction Design and Children\t/conf/acmidc\t/conf/acmidc/idc\n" +
  "C\tACML\tAsian Conference on Machine Learning\t/conf/acml\t/conf/acml/acml\n" +
  "C\tACNS\tApplied Cryptography and Network Security\t/conf/acns\t/conf/acns/acns\n" +
  "B\tACSAC\tAnnual Computer Security Applications Conference\t/conf/acsac\t/conf/acsac/acsac\n" +
  "C\tADMA\tInternational Conference on Advanced Data Mining and Applications\t/conf/adma\t/conf/adma/adma\n" +
  "C\tAFT\tAdvances in Financial Technologies\t/conf/aft\t/conf/aft/aft\n" +
  "B\tICAPS\tInternational Conference on Automated Planning and Scheduling\t/conf/aips\t/conf/aips/icaps\n" +
  "C\tAISTATS\tInternational Conference on Artificial Intelligence and Statistics\t/conf/aistats\t/conf/aistats/aistats\n" +
  "C\tALT\tInternational Conference on Algorithmic Learning Theory\t/conf/alt\t/conf/alt/alt\n" +
  "C\tAMIA\tAmerican Medical Informatics Association Annual Symposium\t/conf/amia\t/conf/amia/amia\n" +
  "C\tANCS\tACM/IEEE Symposium on Architectures for Networking and Communication Systems\t/conf/ancs\t/conf/ancs/ancs\n" +
  "C\tAPBC\tAsia Pacific Bioinformatics Conference\t/conf/apbc\t/conf/apbc/apbc\n" +
  "C\tAPLAS\tAsian Symposium on Programming Languages and Systems\t/conf/aplas\t/conf/aplas/aplas\n" +
  "C\tAPNet\tAsia-Pacific Workshop on Networking\t/conf/apnet\t/conf/apnet/apnet\n" +
  "C\tAPNOMS\tAsia-Pacific Network Operations and Management Symposium\t/conf/apnoms\t/conf/apnoms/apnoms\n" +
  "C\tAPPT\tInternational Symposium on Advanced Parallel Processing Technology\t/conf/appt\t/conf/appt/appt\n" +
  "C\tAPSEC\tAsia-Pacific Software Engineering Conference\t/conf/apsec\t/conf/apsec/apsec\n" +
  "C\tPacificVis\tIEEE Pacific Visualization Symposium\t/conf/apvis\t/conf/apvis/apvis\n" +
  "C\tAPWeb\tAsia Pacific Web Conference\t/conf/apweb\t/conf/apweb/apweb\n" +
  "C\tASAP\tIEEE International Conference on Application-Specific Systems, Architectures, and Processors\t/conf/asap\t/conf/asap/asap\n" +
  "C\tAsiaCCS\tAsia Conference on Computer and Communications Security\t/conf/asiaccs\t/conf/asiaccs/asiaccs\n" +
  "B\tASIACRYPT\tAnnual International Conference on the Theory and Application of Cryptology and Information Security\t/conf/asiacrypt\t/conf/asiacrypt/asiacrypt\n" +
  "C\tASP-DAC\tAsia and South Pacific Design Automation Conference\t/conf/aspdac\t/conf/aspdac/aspdac\n" +
  "A\tASPLOS\tInternational Conference on Architectural Support for Programming Languages and Operating Systems\t/conf/asplos\t/conf/asplos/asplos\n" +
  "C\tASRU\tAutomatic Speech Recognition and Understanding Workshop\t/conf/asru\t/conf/asru/asru\n" +
  "C\tASSETS\tInternational ACM SIGACCESS Conference on Computers and Accessibility\t/conf/assets\t/conf/assets/assets\n" +
  "B\tAAMAS\tInternational Joint Conference on Autonomous Agents and Multi-agent Systems\t/conf/atal\t/conf/atal/aamas\n" +
  "C\tATS\tIEEE Asian Test Symposium\t/conf/ats\t/conf/ats/ats\n" +
  "C\tATVA\tInternational Symposium on Automated Technology for Verification and Analysis\t/conf/atva\t/conf/atva/atva\n" +
  "C\tAVI\tInternational Working Conference on Advanced Visual Interfaces\t/conf/avi\t/conf/avi/avi\n" +
  "B\tBIBM\tIEEE International Conference on Bioinformatics and Biomedicine\t/conf/bibm\t/conf/bibm/bibm\n" +
  "C\tIEEE BigData\tIEEE International Conference on Big Data\t/conf/bigdataconf\t/conf/bigdataconf/bigdataconf\n" +
  "C\tBlockSys\tInternational Conference on Blockchain, Artificial Intelligence, and Trustworthy Systems\t/conf/blocksys\t/conf/blocksys/blocksys\n" +
  "C\tBMVC\tBritish Machine Vision Conference\t/conf/bmvc\t/conf/bmvc/bmvc\n" +
  "C\tCASAXR\tInternational Conference on Computer Animation, Social Agents, and Extended Reality\t/conf/ca\t/conf/ca/casa\n" +
  "B\tCADE\tConference on Automated Deduction\t/conf/cade\t/conf/cade/cade\n" +
  "C\tCAD/Graphics\tInternational Conference on Computer-Aided Design and Computer Graphics\t/conf/cadgraphics\t/conf/cadgraphics/cadgraphics\n" +
  "B\tCAiSE\tInternational Conference on Advanced Information Systems Engineering\t/conf/caise\t/conf/caise/caise\n" +
  "C\tCASES\tInternational Conference on Compilers, Architectures, and Synthesis for Embedded Systems\t/conf/cases\t/conf/cases/cases\n" +
  "A\tCAV\tInternational Conference on Computer Aided Verification\t/conf/cav\t/conf/cav/cav\n" +
  "B\tCC\tInternational Conference on Compiler Construction\t/conf/cc\t/conf/cc/cc\n" +
  "C\tCCGRID\tIEEE/ACM International Symposium on Cluster, Cloud and Grid Computing\t/conf/ccgrid\t/conf/ccgrid/ccgrid\n" +
  "A\tCCS\tACM Conference on Computer and Communications Security\t/conf/ccs\t/conf/ccs/ccs\n" +
  "C\tIEEE CEC\tCongress on Evolutionary Computation\t/conf/cec\t/conf/cec/cec\n" +
  "C\tCF\tACM International Conference on Computing Frontiers\t/conf/cf\t/conf/cf/cf\n" +
  "C\tCGI\tComputer Graphics International\t/conf/cgi\t/conf/cgi/cgi\n" +
  "B\tCGO\tThe International Symposium on Code Generation and Optimization\t/conf/cgo\t/conf/cgo/cgo\n" +
  "B\tCHES\tInternational Conference on Cryptographic Hardware and Embedded Systems\t/conf/ches\t/conf/ches/ches\n" +
  "A\tCHI\tACM Conference on Human Factors in Computing Systems\t/conf/chi\t/conf/chi/chi\n" +
  "B\tCIDR\tConference on Innovative Data Systems Research\t/conf/cidr\t/conf/cidr/cidr\n" +
  "B\tCIKM\tACM International Conference on Information and Knowledge Management\t/conf/cikm\t/conf/cikm/cikm\n" +
  "C\tInscrypt\tConference on Information Security and Cryptology\t/conf/cisc\t/conf/cisc/cisc\n" +
  "B\tSoCC\tACM Symposium on Cloud Computing\t/conf/cloud\t/conf/cloud/socc\n" +
  "B\tCLUSTER\tIEEE International Conference on Cluster Computing\t/conf/cluster\t/conf/cluster/cluster\n" +
  "B\tCCC\tConference on Computational Complexity\t/conf/coco\t/conf/coco/coco\n" +
  "B\tCOCOON\tInternational Computing and Combinatorics Conference\t/conf/cocoon\t/conf/cocoon/cocoon\n" +
  "C\tCODASPY\tConference on Data and Application Security and Privacy\t/conf/codaspy\t/conf/codaspy/codaspy\n" +
  "B\tCODES+ISSS\tInternational Conference on Hardware/Software Co-design and System Synthesis\t/conf/codes\t/conf/codes/codes\n" +
  "B\tCODES+ISSS\tInternational Conference on Hardware/Software Co-design and System Synthesis\t/conf/codesisss\t/conf/codes/codesisss\n" +
  "B\tCogSci\tAnnual Meeting of the Cognitive Science Society\t/conf/cogsci\t/conf/cogsci/cogsci\n" +
  "C\tCollaborateCom\tInternational Conference on Collaborative Computing: Networking, Applications and Worksharing\t/conf/colcom\t/conf/colcom/colcom\n" +
  "B\tCOLING\tInternational Conference on Computational Linguistics\t/conf/coling\t/conf/coling/coling\n" +
  "B\tCOLT\tAnnual Conference on Computational Learning Theory\t/conf/colt\t/conf/colt/colt\n" +
  "B\tSoCG\tInternational Symposium on Computational Geometry\t/conf/compgeom\t/conf/compgeom/compgeom\n" +
  "C\tCOMPSAC\tInternational Computer Software and Applications Conference\t/conf/compsac\t/conf/compsac/compsac\n" +
  "B\tCONCUR\tInternational Conference on Concurrency Theory\t/conf/concur\t/conf/concur/concur\n" +
  "B\tCoNEXT\tACM International Conference on Emerging Networking Experiments and Technologies\t/conf/conext\t/conf/conext/conext\n" +
  "C\tCoNLL\tConference on Computational Natural Language Learning\t/conf/conll\t/conf/conll/conll\n" +
  "C\tCoopIS\tInternational Conference on Cooperative Information Systems\t/conf/coopis\t/conf/coopis/coopis\n" +
  "C\tCOSIT\tInternational Conference on Spatial Information Theory\t/conf/cosit\t/conf/cosit/cosit\n" +
  "B\tCP\tInternational Conference on Principles and Practice of Constraint Programming\t/conf/cp\t/conf/cp/cp\n" +
  "A\tCRYPTO\tInternational Cryptology Conference\t/conf/crypto\t/conf/crypto/crypto\n" +
  "C\tCSCloud\tInternational Conference on Cyber Security and Cloud Computing\t/conf/cscloud\t/conf/cscloud/cscloud\n" +
  "A\tCSCW\tACM Conference On Computer-Supported Cooperative Work And Social Computing\t/conf/cscw\t/conf/cscw/cscw\n" +
  "C\tCSCWD\tInternational Conference on Computer Supported Cooperative Work in Design\t/conf/cscwd\t/conf/cscwd/cscwd\n" +
  "B\tCSFW\tIEEE Computer Security Foundations Workshop\t/conf/csfw\t/conf/csfw/csfw\n" +
  "C\tCSL\tComputer Science Logic\t/conf/csl\t/conf/csl/csl\n" +
  "C\tCT-RSA\tThe Cryptographer's Track at RSA Conference\t/conf/ctrsa\t/conf/ctrsa/ctrsa\n" +
  "C\tCVM\tComputational Visual Media\t/conf/cvm\t/conf/cvm/cvm\n" +
  "A\tCVPR\tIEEE/CVF Computer Vision and Pattern Recognition Conference\t/conf/cvpr\t/conf/cvpr/cvpr\n" +
  "A\tDAC\tDesign Automation Conference\t/conf/dac\t/conf/dac/dac\n" +
  "C\tDAI\tInternational Conference on Distributed Artificial Intelligence\t/conf/dai2\t/conf/dai2/dai2\n" +
  "B\tDASFAA\tInternational Conference on Database Systems for Advanced Applications\t/conf/dasfaa\t/conf/dasfaa/dasfaa\n" +
  "B\tDATE\tDesign, Automation & Test in Europe\t/conf/date\t/conf/date/date\n" +
  "B\tDCC\tData Compression Conference\t/conf/dcc\t/conf/dcc/dcc\n" +
  "C\tDEXA\tInternational Conference on Database and Expert System Applications\t/conf/dexa\t/conf/dexa/dexa\n" +
  "C\tDFRWS\tDigital Forensic Research Workshop\t/conf/dfrws\t/conf/dfrws/dfrws\n" +
  "C\tDIMVA\tConference on Detection of Intrusions and Malware & Vulnerability Assessment\t/conf/dimva\t/conf/dimva/dimva\n" +
  "C\tDRM\tACM Workshop on Digital Rights Management\t/conf/drm\t/conf/drm/drm\n" +
  "C\tDSAA\tIEEE International Conference on Data Science and Advanced Analytics\t/conf/dsaa\t/conf/dsaa/dsaa\n" +
  "B\tDSN\tInternational Conference on Dependable Systems and Networks\t/conf/dsn\t/conf/dsn/dsn\n" +
  "C\tEASE\tInternational Conference on Evaluation and Assessment in Software Engineering\t/conf/ease\t/conf/ease/ease\n" +
  "B\tECAI\tEuropean Conference on Artificial Intelligence\t/conf/ecai\t/conf/ecai/ecai\n" +
  "B\tECCV\tEuropean Conference on Computer Vision\t/conf/eccv\t/conf/eccv/eccv\n" +
  "C\tECIR\tEuropean Conference on Information Retrieval\t/conf/ecir\t/conf/ecir/ecir\n" +
  "B\tECML-PKDD\tEuropean Conference on Machine Learning and Principles and Practice of Knowledge Discovery in Databases\t/conf/ecml\t/conf/ecml/ecml\n" +
  "B\tECOOP\tEuropean Conference on Object-Oriented Programming\t/conf/ecoop\t/conf/ecoop/ecoop\n" +
  "B\tECSCW\tEuropean Conference on Computer Supported Cooperative Work\t/conf/ecscw\t/conf/ecscw/ecscw\n" +
  "B\tEDBT\tInternational Conference on Extending Database Technology\t/conf/edbt\t/conf/edbt/edbt\n" +
  "B\tEMNLP\tConference on Empirical Methods in Natural Language Processing\t/conf/emnlp\t/conf/emnlp/emnlp\n" +
  "B\tEMSOFT\tInternational Conference on Embedded Software IEEE/ACM/IFIP\t/conf/emsoft\t/conf/emsoft/emsoft\n" +
  "C\tER\tInternational Conference on Conceptual Modeling\t/conf/er\t/conf/er/er\n" +
  "B\tESA\tEuropean Symposium on Algorithms\t/conf/esa\t/conf/esa/esa\n" +
  "B\tESEM\tInternational Symposium on Empirical Software Engineering and Measurement\t/conf/esem\t/conf/esem/esem\n" +
  "B\tESORICS\tEuropean Symposium on Research in Computer Security\t/conf/esorics\t/conf/esorics/esorics\n" +
  "C\tESWC\tExtended Semantic Web Conference\t/conf/esws\t/conf/esws/eswc\n" +
  "B\tETAPS\tEuropean Joint Conferences on Theory and Practice of Software\t/conf/etaps\t/conf/etaps/etaps\n" +
  "C\tETS\tIEEE European Test Symposium\t/conf/ets\t/conf/ets/ets\n" +
  "A\tEUROCRYPT\tInternational Conference on the Theory and Applications of Cryptographic Techniques\t/conf/eurocrypt\t/conf/eurocrypt/eurocrypt\n" +
  "B\tEurographics\tAnnual Conference of the European Association for Computer Graphics\t/conf/eurographics\t/conf/eurographics/eg\n" +
  "B\tEuro-Par\tEuropean Conference on Parallel and Distributed Computing\t/conf/europar\t/conf/europar/europar\n" +
  "C\tEuroS&P\tIEEE European Symposium on Security and Privacy\t/conf/eurosp\t/conf/eurosp/eurosp\n" +
  "A\tEuroSys\tEuropean Conference on Computer Systems\t/conf/eurosys\t/conf/eurosys/eurosys\n" +
  "A\tFAST\tUSENIX Conference on File and Storage Technologies\t/conf/fast\t/conf/fast/fast\n" +
  "C\tIJTCS-FAW\tInternational Joint Conference on Theoretical Computer Science - Frontier of Algorithmic Wisdom\t/conf/faw\t/conf/faw/faw\n" +
  "C\tFC\tFinancial Cryptography and Data Security\t/conf/fc\t/conf/fc/fc\n" +
  "C\tFCCM\tIEEE Symposium on Field-Programmable Custom Computing Machines\t/conf/fccm\t/conf/fccm/fccm\n" +
  "C\tFG\tInternational Conference on Automatic Face and Gesture Recognition\t/conf/fgr\t/conf/fgr/fg\n" +
  "A\tFM\tInternational Symposium on Formal Methods\t/conf/fm\t/conf/fm/fm\n" +
  "B\tFMCAD\tFormal Methods in Computer-Aided Design\t/conf/fmcad\t/conf/fmcad/fmcad\n" +
  "A\tFOCS\tIEEE Annual Symposium on Foundations of Computer Science\t/conf/focs\t/conf/focs/focs\n" +
  "C\tFORTE\tInternational Conference on Formal Techniques for Distributed Objects, Components, and Systems\t/conf/forte\t/conf/forte/forte\n" +
  "B\tFPGA\tACM/SIGDA International Symposium on Field-Programmable Gate Arrays\t/conf/fpga\t/conf/fpga/fpga\n" +
  "C\tFPL\tInternational Conference on Field-Programmable Logic and Applications\t/conf/fpl\t/conf/fpl/fpl\n" +
  "C\tFPT\tInternational Conference on Field-Programmable Technology\t/conf/fpt\t/conf/fpt/fpt\n" +
  "C\tFSCD\tInternational Conference on Formal Structures for Computation and Deduction\t/conf/fscd\t/conf/fscd/fscd\n" +
  "B\tFSE\tFast Software Encryption\t/conf/fse\t/conf/fse/fse\n" +
  "C\tFSTTCS\tFoundations of Software Technology and Theoretical Computer Science\t/conf/fsttcs\t/conf/fsttcs/fsttcs\n" +
  "C\tGECCO\tGenetic and Evolutionary Computation Conference\t/conf/gecco\t/conf/gecco/gecco\n" +
  "C\tSIGSPATIAL\tACM Special Interest Group on Spatial Information\t/conf/gis\t/conf/gis/gis\n" +
  "C\tGLOBECOM\tIEEE Global Communications Conference\t/conf/globecom\t/conf/globecom/globecom\n" +
  "C\tGLSVLSI\tGreat Lakes Symposium on VLSI\t/conf/glvlsi\t/conf/glvlsi/glvlsi\n" +
  "C\tGMP\tGeometric Modeling and Processing\t/conf/gmp\t/conf/gmp/gmp\n" +
  "C\tGPC\tConference on Green, Pervasive and Cloud Computing\t/conf/gpc\t/conf/gpc/gpc\n" +
  "C\tGI\tGraphics Interface\t/conf/graphicsinterface\t/conf/graphicsinterface/graphicsinterface\n" +
  "B\tGROUP\tACM International Conference on Supporting Group Work\t/conf/group\t/conf/group/group\n" +
  "C\t\tIEEE World Haptics Conference\t/conf/haptics\t/conf/haptics/haptics\n" +
  "C\tHiPC\tIEEE International Conference on High Performance Computing, Data and Analytics\t/conf/hipc\t/conf/hipc/hipc\n" +
  "B\tHiPEAC\tInternational Conference on High Performance and Embedded Architectures and Compilers\t/conf/hipeac\t/conf/hipeac/hipeac\n" +
  "B\tHOT CHIPS\tHot Chips: A Symposium on High Performance Chips\t/conf/hotchips\t/conf/hotchips/hotchips\n" +
  "C\tHOTI\tIEEE Symposium on High-Performance Interconnects\t/conf/hoti\t/conf/hoti/hoti\n" +
  "C\tHotNets\tACM The Workshop on Hot Topics in Networks\t/conf/hotnets\t/conf/hotnets/hotnets\n" +
  "B\tHotOS\tUSENIX Workshop on Hot Topics in Operating Systems\t/conf/hotos\t/conf/hotos/hotos\n" +
  "C\tHotStorage\tHotStorage\t/conf/hotstorage\t/conf/hotstorage/hotstorage\n" +
  "A\tHPCA\tIEEE International Symposium on High Performance Computer Architecture\t/conf/hpca\t/conf/hpca/hpca\n" +
  "C\tHPCC\tIEEE International Conference on High Performance Computing and Communications\t/conf/hpcc\t/conf/hpcc/hpcc\n" +
  "A\tHPDC\tThe International ACM Symposium on High-Performance Parallel and Distributed Computing\t/conf/hpdc\t/conf/hpdc/hpdc\n" +
  "A\tUbiComp\tACM international joint conference on Pervasive and Ubiquitous Computing\t/conf/huc\t/conf/huc/ubicomp\n" +
  "B\tHSCC\tInternational Conference on Hybrid Systems: Computation and Control\t/conf/hybrid\t/conf/hybrid/hscc\n" +
  "C\tICA3PP\tInternational Conference on Algorithms and Architectures for Parallel Processing\t/conf/ica3pp\t/conf/ica3pp/ica3pp\n" +
  "B\tICALP\tInternational Colloquium on Automata, Languages and Programming\t/conf/icalp\t/conf/icalp/icalp\n" +
  "C\tICANN\tInternational Conference on Artificial Neural Networks\t/conf/icann\t/conf/icann/icann\n" +
  "B\tICASSP\tIEEE International Conference on Acoustics, Speech and Signal Processing\t/conf/icassp\t/conf/icassp/icassp\n" +
  "C\tIJCB\tInternational Joint Conference on Biometrics\t/conf/icb\t/conf/icb/icb\n" +
  "C\tICC\tIEEE International Conference on Communications\t/conf/icc\t/conf/icc/icc\n" +
  "B\tICCAD\tInternational Conference on Computer-Aided Design\t/conf/iccad\t/conf/iccad/iccad\n" +
  "B\tICCBR\tInternational Conference on Case-Based Reasoning\t/conf/iccbr\t/conf/iccbr/iccbr\n" +
  "C\tICCCN\tIEEE International Conference on Computer Communications and Networks\t/conf/icccn\t/conf/icccn/icccn\n" +
  "B\tICCD\tInternational Conference on Computer Design\t/conf/iccd\t/conf/iccd/iccd\n" +
  "A\tICCV\tInternational Conference on Computer Vision\t/conf/iccv\t/conf/iccv/iccv\n" +
  "C\tICDAR\tInternational Conference on Document Analysis and Recognition\t/conf/icdar\t/conf/icdar/icdar\n" +
  "B\tICDCS\tIEEE International Conference on Distributed Computing Systems\t/conf/icdcs\t/conf/icdcs/icdcs\n" +
  "A\tICDE\tIEEE International Conference on Data Engineering\t/conf/icde\t/conf/icde/icde\n" +
  "C\tICDF2C\tInternational Conference on Digital Forensics & Cyber Crime\t/conf/icdf2c\t/conf/icdf2c/icdf2c\n" +
  "B\tICDM\tIEEE International Conference on Data Mining\t/conf/icdm\t/conf/icdm/icdm\n" +
  "B\tICDT\tInternational Conference on Database Theory\t/conf/icdt\t/conf/icdt/icdt\n" +
  "C\tICECCS\tIEEE International Conference on Engineering of Complex Computer Systems\t/conf/iceccs\t/conf/iceccs/iceccs\n" +
  "C\tICFEM\tInternational Conference on Formal Engineering Methods\t/conf/icfem\t/conf/icfem/icfem\n" +
  "B\tICFP\tInternational Conference on Function Programming\t/conf/icfp\t/conf/icfp/icfp\n" +
  "C\tICIC\tInternational Conference on Intelligent Computing\t/conf/icic\t/conf/icic/icic\n" +
  "C\tICICS\tInternational Conference on Information and Communications Security\t/conf/icics\t/conf/icics/icics\n" +
  "C\tICIG\tInternational Conference on Image and Graphics\t/conf/icig\t/conf/icig/icig\n" +
  "C\tICIP\tInternational Conference on Image Processing\t/conf/icip\t/conf/icip/icip\n" +
  "A\tICLR\tInternational Conference on Learning Representations\t/conf/iclr\t/conf/iclr/iclr\n" +
  "B\tICME\tIEEE International Conference on Multimedia & Expo\t/conf/icmcs\t/conf/icmcs/icme\n" +
  "C\tICMI\tACM International Conference on Multimodal Interaction\t/conf/icmi\t/conf/icmi/icmi\n" +
  "A\tICML\tInternational Conference on Machine Learning\t/conf/icml\t/conf/icml/icml\n" +
  "B\tICNP\tIEEE International Conference on Network Protocols\t/conf/icnp\t/conf/icnp/icnp\n" +
  "C\tICONIP\tInternational Conference on Neural Information Processing\t/conf/iconip\t/conf/iconip/iconip\n" +
  "C\tICPADS\tInternational Conference on Parallel and Distributed Systems\t/conf/icpads\t/conf/icpads/icpads\n" +
  "B\tICPP\tInternational Conference on Parallel Processing\t/conf/icpp\t/conf/icpp/icpp\n" +
  "C\tICPR\tInternational Conference on Pattern Recognition\t/conf/icpr\t/conf/icpr/icpr\n" +
  "B\tICRA\tIEEE International Conference on Robotics and Automation\t/conf/icra\t/conf/icra/icra\n" +
  "B\tICS\tInternational Conference on Supercomputing\t/conf/ics\t/conf/ics/ics\n" +
  "A\tICSE\tInternational Conference on Software Engineering\t/conf/icse\t/conf/icse/icse\n" +
  "B\tICSME\tInternational Conference on Software Maintenance and Evolution\t/conf/icsm\t/conf/icsm/icsm\n" +
  "B\tICSOC\tInternational Conference on Service Oriented Computing\t/conf/icsoc\t/conf/icsoc/icsoc\n" +
  "C\tICSR\tInternational Conference on Software Reuse\t/conf/icsr\t/conf/icsr/icsr\n" +
  "C\tICST\tIEEE International Conference on Software Testing, Verification and Validation\t/conf/icst\t/conf/icst/icst\n" +
  "C\tICTAC\tInternational Colloquium on Theoretical Aspects of Computing\t/conf/ictac\t/conf/ictac/ictac\n" +
  "C\tICTAI\tIEEE International Conference on Tools with Artificial Intelligence\t/conf/ictai\t/conf/ictai/ictai\n" +
  "C\tICWE\tInternational Conference on Web Engineering\t/conf/icwe\t/conf/icwe/icwe\n" +
  "B\tICWS\tIEEE International Conference on Web Services\t/conf/icws\t/conf/icws/icws\n" +
  "B\tICWSM\tThe International AAAI Conference on Web and Social Media\t/conf/icwsm\t/conf/icwsm/icwsm\n" +
  "C\tICXR\tCCF International Conference on Extended Reality\t/conf/icxr\t/conf/icxr/icxr\n" +
  "C\tSEC\tACM/IEEE Symposium on Edge Computing\t/conf/ieeesec\t/conf/ieeesec/sec\n" +
  "B\tAAMAS\tInternational Joint Conference on Autonomous Agents and Multi-agent Systems\t/conf/ifaamas\t/conf/ifaamas/aamas\n" +
  "C\tIFIP WG 11.9\tIFIP WG 11.9 International Conference on Digital Forensics\t/conf/ifip11-9\t/conf/ifip11-9/df\n" +
  "C\tIH&MMSec\tACM Workshop on Information Hiding and Multimedia Security\t/conf/ih\t/conf/ih/ih\n" +
  "B\tIJCAI\tInternational Joint Conference on Artificial Intelligence\t/conf/ijcai\t/conf/ijcai/ijcai\n" +
  "C\tIJCNN\tInternational Joint Conference on Neural Networks\t/conf/ijcnn\t/conf/ijcnn/ijcnn\n" +
  "C\tILP\tInternational Conference on Inductive Logic Programming\t/conf/ilp\t/conf/ilp/ilp\n" +
  "C\tIM\tIFIP/IEEE International Symposium on Integrated Network Management\t/conf/im\t/conf/im/im\n" +
  "B\tIMC\tACM Internet Measurement Conference\t/conf/imc\t/conf/imc/imc\n" +
  "A\tINFOCOM\tIEEE International Conference on Computer Communications\t/conf/infocom\t/conf/infocom/infocom\n" +
  "C\tINTERACT\tInternational Conference on Human-Computer Interaction of International Federation for Information Processing\t/conf/interact\t/conf/interact/interact\n" +
  "C\tInternetware\tAsia-Pacific Symposium on Internetware\t/conf/internetware\t/conf/internetware/internetware\n" +
  "B\tINTER-SPEECH\tConference of the International Speech Communication Association\t/conf/interspeech\t/conf/interspeech/interspeech\n" +
  "C\tIPCCC\tIEEE International Performance Computing and Communications Conference\t/conf/ipccc\t/conf/ipccc/ipccc\n" +
  "C\tIPCO\tInternational Conference on Integer Programming and Combinatorial Optimization\t/conf/ipco\t/conf/ipco/ipco\n" +
  "B\tIPDPS\tIEEE International Parallel & Distributed Processing Symposium\t/conf/ipps\t/conf/ipps/ipdps\n" +
  "B\tIPSN\tInternational Conference on Information Processing in Sensor Networks\t/conf/ipsn\t/conf/ipsn/ipsn\n" +
  "C\tIROS\tIEEE/RSJ International Conference on Intelligent Robots and Systems\t/conf/iros\t/conf/iros/iros\n" +
  "C\tISAAC\tInternational Symposium on Algorithms and Computation\t/conf/isaac\t/conf/isaac/isaac\n" +
  "C\tISBRA\tInternational Symposium on Bioinformatics Research and Applications\t/conf/isbra\t/conf/isbra/isbra\n" +
  "A\tISCA\tInternational Symposium on Computer Architecture\t/conf/isca\t/conf/isca/isca\n" +
  "B\tISCAS\tIEEE International Symposium on Circuits and Systems\t/conf/iscas\t/conf/iscas/iscas\n" +
  "C\tISCC\tIEEE Symposium on Computers and Communications\t/conf/iscc\t/conf/iscc/iscc\n" +
  "C\tISLPED\tInternational Symposium on Low Power Electronics and Design\t/conf/islped\t/conf/islped/islped\n" +
  "B\tISMAR\tInternational Symposium on Mixed and Augmented Reality\t/conf/ismar\t/conf/ismar/ismar\n" +
  "B\tISMB\tInternational conference on Intelligent Systems for Molecular Biology\t/conf/ismb\t/conf/ismb/ismb\n" +
  "C\tISPA\tIEEE International Symposium on Parallel and Distributed Processing with Applications\t/conf/ispa\t/conf/ispa/ispa\n" +
  "C\tISPASS\tIEEE International Symposium on Performance Analysis of Systems and Software\t/conf/ispass\t/conf/ispass/ispass\n" +
  "C\tISPD\tInternational Symposium on Physical Design\t/conf/ispd\t/conf/ispd/ispd\n" +
  "C\tICSSP\tInternational Conference on Software and System Process\t/conf/ispw\t/conf/ispw/icsp\n" +
  "B\tISSRE\tInternational Symposium on Software Reliability Engineering\t/conf/issre\t/conf/issre/issre\n" +
  "A\tISSTA\tInternational Symposium on Software Testing and Analysis\t/conf/issta\t/conf/issta/issta\n" +
  "C\tISC\tInformation Security Conference\t/conf/isw\t/conf/isw/isw\n" +
  "B\tITC\tInternational Test Conference\t/conf/itc\t/conf/itc/itc\n" +
  "C\tITC-Asia\tInternational Test Conference in Asia\t/conf/itc-asia\t/conf/itc-asia/itc-asia\n" +
  "B\tIUI\tACM International Conference on Intelligent User Interfaces\t/conf/iui\t/conf/iui/iui\n" +
  "B\tICPC\tIEEE International Conference on Program Comprehension\t/conf/iwpc\t/conf/iwpc/iwpc\n" +
  "B\tIWQoS\tIEEE/ACM International Workshop on Quality of Service\t/conf/iwqos\t/conf/iwqos/iwqos\n" +
  "A\tASE\tInternational Conference on Automated Software Engineering\t/conf/kbse\t/conf/kbse/kbse\n" +
  "A\tSIGKDD\tACM SIGKDD Conference on Knowledge Discovery and Data Mining\t/conf/kdd\t/conf/kdd/kdd\n" +
  "B\tKR\tInternational Conference on Principles of Knowledge Representation and Reasoning\t/conf/kr\t/conf/kr/kr\n" +
  "C\tKSEM\tInternational conference on Knowledge Science,Engineering and Management\t/conf/ksem\t/conf/ksem/ksem\n" +
  "C\tLCN\tIEEE Conference on Local Computer Networks\t/conf/lcn\t/conf/lcn/lcn\n" +
  "B\tLCTES\tACM SIGPLAN/SIGBED International Conference on Languages, Compilers and Tools for Embedded Systems\t/conf/lctrts\t/conf/lctrts/lctes\n" +
  "A\tLICS\tACM/IEEE Symposium on Logic in Computer Science\t/conf/lics\t/conf/lics/lics\n" +
  "B\tLISA\tLarge Installation System Administration Conference\t/conf/lisa\t/conf/lisa/lisa\n" +
  "C\tLOPSTR\tInternational Symposium on Logic-based Program Synthesis and Transformation\t/conf/lopstr\t/conf/lopstr/lopstr\n" +
  "C\tMASCOTS\tInternational Symposium on Modeling, Analysis, and Simulation of Computer and Telecommunication Systems\t/conf/mascots\t/conf/mascots/mascots\n" +
  "C\tMASS\tIEEE International Conference on Mobile Adhoc and Sensor Systems\t/conf/mass\t/conf/mass/mass\n" +
  "C\tMDM\tInternational Conference on Mobile Data Management\t/conf/mdm\t/conf/mdm/mdm\n" +
  "C\tMEMOCODE\tInternational Conference on Formal Methods and Models for Co-Design\t/conf/memocode\t/conf/memocode/memocode\n" +
  "C\tMFCS\tMathematical Foundations of Computer Science\t/conf/mfcs\t/conf/mfcs/mfcs\n" +
  "B\tMobileHCI\tACM International Conference on Mobile Human-Computer Interaction\t/conf/mhci\t/conf/mhci/mhci\n" +
  "B\tMICCAI\tInternational Conference on Medical Image Computing and Computer-Assisted Intervention\t/conf/miccai\t/conf/miccai/miccai\n" +
  "A\tMICRO\tIEEE/ACM International Symposium on Microarchitecture\t/conf/micro\t/conf/micro/micro\n" +
  "B\tMiddleware\tInternational Middleware Conference\t/conf/middleware\t/conf/middleware/middleware\n" +
  "B\tICMR\tACM SIGMM International Conference on Multimedia Retrieval\t/conf/mir\t/conf/mir/mir\n" +
  "A\tACM MM\tACM International Conference on Multimedia\t/conf/mm\t/conf/mm/mm\n" +
  "C\tMMAsia\tACM Multimedia Asia\t/conf/mmasia\t/conf/mmasia/mmasia\n" +
  "C\tMMM\tInternational Conference on Multimedia Modeling\t/conf/mmm\t/conf/mmm/mmm\n" +
  "A\tMobiCom\tACM International Conference on Mobile Computing and Networking\t/conf/mobicom\t/conf/mobicom/mobicom\n" +
  "B\tMobiHoc\tInternational Symposium on Theory, Algorithmic Foundations, and Protocol Design for Mobile Networks and Mobile Computing\t/conf/mobihoc\t/conf/mobihoc/mobihoc\n" +
  "C\tMobiQuitous\tInternational Conference on Mobile and Ubiquitous Systems: Computing, Networking and Services\t/conf/mobiquitous\t/conf/mobiquitous/mobiquitous\n" +
  "B\tMobiSys\tACM International Conference on Mobile Systems, Applications, and Services\t/conf/mobisys\t/conf/mobisys/mobisys\n" +
  "B\tMoDELS\tACM/IEEE International Conference on Model Driven Engineering Languages and Systems\t/conf/models\t/conf/models/models\n" +
  "C\tMSN\tInternational Conference on Mobility, Sensing and Networking\t/conf/msn\t/conf/msn/msn\n" +
  "C\tMSR\tMining Software Repositories\t/conf/msr\t/conf/msr/msr\n" +
  "B\tMSST\tMass Storage Systems and Technologies\t/conf/mss\t/conf/mss/msst\n" +
  "C\tMSWiM\tInternational Conference on Modeling, Analysis and Simulation of Wireless and Mobile Systems\t/conf/mswim\t/conf/mswim/mswim\n" +
  "B\tNAACL\tNorth American Chapter of the Association for Computational Linguistics\t/conf/naacl\t/conf/naacl/naacl\n" +
  "C\tNAS\tInternational Conference on Networking, Architecture and Storages\t/conf/nas\t/conf/nas/nas\n" +
  "C\tNCMMSC\tNational Conference on Man-Machine Speech Communication\t/conf/ncmmsc\t/conf/ncmmsc/ncmmsc\n" +
  "A\tNDSS\tNetwork and Distributed System Security Symposium\t/conf/ndss\t/conf/ndss/ndss\n" +
  "C\tNetworking\tIFIP International Conferences on Networking\t/conf/networking\t/conf/networking/networking\n" +
  "A\tNeurIPS\tConference on Neural Information Processing Systems\t/conf/nips\t/conf/nips/nips\n" +
  "C\tNLPCC\tCCF International Conference on Natural Language Processing and Chinese Computing\t/conf/nlpcc\t/conf/nlpcc/nlpcc\n" +
  "C\tNOCS\tACM/IEEE International Symposium on Networks-on-Chip\t/conf/nocs\t/conf/nocs/nocs\n" +
  "B\tNOSSDAV\tInternational Workshop on Network and Operating System Support for Digital Audio and Video\t/conf/nossdav\t/conf/nossdav/nossdav\n" +
  "C\tNPC\tIFIP International Conference on Network and Parallel Computing\t/conf/npc\t/conf/npc/npc\n" +
  "A\tNSDI\tSymposium on Network System Design and Implementation\t/conf/nsdi\t/conf/nsdi/nsdi\n" +
  "C\tNSPW\tNew Security Paradigms Workshop\t/conf/nspw\t/conf/nspw/nspw\n" +
  "A\tOOPSLA\tConference on Object-Oriented Programming Systems, Languages,and Applications\t/conf/oopsla\t/conf/oopsla/oopsla\n" +
  "A\tOSDI\tUSENIX Symposium on Operating Systems Design and Implementation\t/conf/osdi\t/conf/osdi/osdi\n" +
  "C\tP2P\tIEEE International Conference on P2P Computing\t/conf/p2p\t/conf/p2p/p2p\n" +
  "C\tPAKDD\tPacific-Asia Conference on Knowledge Discovery and Data Mining\t/conf/pakdd\t/conf/pakdd/pakdd\n" +
  "C\tPAM\tPassive and Active Measurement Conference\t/conf/pam\t/conf/pam/pam\n" +
  "C\tPASTE\tACMSIGPLAN-SIGSOFT Workshop on Program Analysis for Software Tools and Engineering\t/conf/paste\t/conf/paste/paste\n" +
  "C\tPEPM\tACM SIGPLAN Workshop on Partial Evaluation and Program Manipulation\t/conf/pepm\t/conf/pepm/pepm\n" +
  "B\tPERCOM\tIEEE International Conference on Pervasive Computing and Communications\t/conf/percom\t/conf/percom/percom\n" +
  "B\tPerformance\tInternational Symposium on Computer Performance, Modeling, Measurements and Evaluation\t/conf/performance\t/conf/performance/performance\n" +
  "C\tPETS\tPrivacy Enhancing Technologies Symposium\t/conf/pet\t/conf/pet/pet\n" +
  "B\tPG\tPacific Conference onComputer Graphics and Applications\t/conf/pg\t/conf/pg/pg\n" +
  "B\tPKC\tInternational Workshop on Practice and Theory in Public Key Cryptography\t/conf/pkc\t/conf/pkc/pkc\n" +
  "B\tECML-PKDD\tEuropean Conference on Machine Learning and Principles and Practice of Knowledge Discovery in Databases\t/conf/pkdd\t/conf/pkdd/pkdd\n" +
  "A\tPLDI\tACM SIGPLAN Conference on Programming Language Design and Implementation\t/conf/pldi\t/conf/pldi/pldi\n" +
  "B\tPODC\tACM Symposium on Principles of Distributed Computing\t/conf/podc\t/conf/podc/podc\n" +
  "B\tPODS\tACM SIGMOD-SIGACT-SIGAI Symposium on Principles of Database Systems\t/conf/pods\t/conf/pods/pods\n" +
  "A\tPOPL\tACM SIGPLAN-SIGACT Symposium on Principles of Programming Languages\t/conf/popl\t/conf/popl/popl\n" +
  "A\tPPoPP\tACM SIGPLAN Symposium on Principles & Practice of Parallel Programming\t/conf/ppopp\t/conf/ppopp/ppopp\n" +
  "B\tPPSN\tParallel Problem Solving from Nature\t/conf/ppsn\t/conf/ppsn/ppsn\n" +
  "C\tPRCV\tChinese Conference on Pattern Recognition and Computer Vision\t/conf/prcv\t/conf/prcv/prcv\n" +
  "C\tPRICAI\tPacific Rim International Conference on Artificial Intelligence\t/conf/pricai\t/conf/pricai/pricai\n" +
  "C\tQRS\tInternational Conference on Software Quality, Reliability and Security\t/conf/qrs\t/conf/qrs/qrs\n" +
  "B\tRAID\tInternational Symposium on Recent Advances in Intrusion Detection\t/conf/raid\t/conf/raid/raid\n" +
  "B\tRE\tIEEE International Requirements Engineering Conference\t/conf/re\t/conf/icre/icre\n" +
  "B\tRECOMB\tAnnual International Conference on Research in Computational Molecular Biology\t/conf/recomb\t/conf/recomb/recomb\n" +
  "B\tRecSys\tACM Conference on Recommender Systems\t/conf/recsys\t/conf/recsys/recsys\n" +
  "C\tREFSQ\tRequirements Engineering: Foundation for Software Quality\t/conf/refsq\t/conf/refsq/refsq\n" +
  "B\tEGSR\tEurographics Symposium on Rendering\t/conf/rt\t/conf/rt/eii\n" +
  "C\tFSCD\tInternational Conference on Formal Structures for Computation and Deduction\t/conf/rta\t/conf/rta/rta\n" +
  "B\tRTAS\tIEEE Real-Time and Embedded Technology and Applications Symposium\t/conf/rtas\t/conf/rtas/rtas\n" +
  "A\tRTSS\tIEEE Real-Time Systems Symposium\t/conf/rtss\t/conf/rtss/rtss\n" +
  "C\tRV\tInternational Conference on Runtime Verification\t/conf/rv\t/conf/rv/rv\n" +
  "C\tSACMAT\tACM Symposium on Access Control Models and Technologies\t/conf/sacmat\t/conf/sacmat/sacmat\n" +
  "C\tSAC\tSelected Areas in Cryptography\t/conf/sacrypt\t/conf/sacrypt/sacrypt\n" +
  "C\tSAGT\tInternational Symposium on Algorithmic Game Theory\t/conf/sagt\t/conf/sagt/sagt\n" +
  "B\tSAS\tInternational Static Analysis Symposium\t/conf/sas\t/conf/sas/sas\n" +
  "B\tSAT\tInternational Conference on Theory and Applications of Satisfiability Testing\t/conf/sat\t/conf/sat/sat\n" +
  "A\tSC\tInternational Conference for High Performance Computing, Networking, Storage, and Analysis\t/conf/sc\t/conf/sc/sc\n" +
  "B\tSCA\tACM SIGGRAPH/Eurographics Symposium on Computer Animation\t/conf/sca\t/conf/sca/sca\n" +
  "C\tSCAM\tIEEE International Working Conference on Source Code Analysis and Manipulation\t/conf/scam\t/conf/scam/scam\n" +
  "B\tSDM\tSIAM International Conference on Data Mining\t/conf/sdm\t/conf/sdm/sdm\n" +
  "C\tSEC\tIFIP International Information Security Conference\t/conf/sec\t/conf/sec/sec\n" +
  "B\tSECON\tIEEE International Conference on Sensing, Communication, and Networking\t/conf/secon\t/conf/secon/secon\n" +
  "C\tSecureComm\tInternational Conference on Security and Privacy in Communication Networks\t/conf/securecomm\t/conf/securecomm/securecomm\n" +
  "C\tSEKE\tInternational Conference on Software Engineering and Knowledge Engineering\t/conf/seke\t/conf/seke/seke\n" +
  "B\tISWC\tIEEE International Semantic Web Conference\t/conf/semweb\t/conf/semweb/iswc\n" +
  "B\tSenSys\tACM Conference on Embedded Networked Sensor Systems\t/conf/sensys\t/conf/sensys/sensys\n" +
  "C\tICSS\tInternational Conference on Service Science\t/conf/service\t/conf/service/service\n" +
  "C\tSETTA\tInternational Symposium on Software Engineering: Theories, Tools, and Applications\t/conf/setta\t/conf/setta/setta\n" +
  "B\tSGP\tEurographics Symposium on Geometry Processing\t/conf/sgp\t/conf/sgp/sgp\n" +
  "B\tI3D\tACM SIGGRAPH Symposium on Interactive 3D Graphics and Games\t/conf/si3d\t/conf/si3d/si3d\n" +
  "A\tSIGCOMM\tACM International Conference on Applications, Technologies, Architectures, and Protocols for Computer Communication\t/conf/sigcomm\t/conf/sigcomm/sigcomm\n" +
  "A\tSIGGRAPH\tACM Special Interest Group on Computer Graphics\t/conf/siggraph\t/conf/siggraph/siggraph\n" +
  "A\tSIGIR\tInternational ACM SIGIR Conference on Research and Development in Information Retrieval\t/conf/sigir\t/conf/sigir/sigir\n" +
  "B\tSIGMETRICS\tInternational Conference on Measurement and Modeling of Computer Systems\t/conf/sigmetrics\t/conf/sigmetrics/sigmetrics\n" +
  "A\tSIGMOD\tACM SIGMOD Conference\t/conf/sigmod\t/conf/sigmod/sigmod\n" +
  "A\tFSE\tACM International Conference on the Foundations of Software Engineering\t/conf/sigsoft\t/conf/sigsoft/fse\n" +
  "C\tSLT\tSpoken Language Technology\t/conf/slt\t/conf/slt/slt\n" +
  "B\tSPM\tSymposium on Solid and Physical Modeling\t/conf/sma\t/conf/sma/sma\n" +
  "C\tSMC\tIEEE International Conference on Systems, Man, and Cybernetics\t/conf/smc\t/conf/smc/smc\n" +
  "C\tSMI\tShape Modeling International\t/conf/smi\t/conf/smi/smi\n" +
  "A\tSODA\tACM-SIAM Symposium on Discrete Algorithms\t/conf/soda\t/conf/soda/soda\n" +
  "A\tSOSP\tACM Symposium on Operating Systems Principles\t/conf/sosp\t/conf/sosp/sosp\n" +
  "C\tSOUPS\tSymposium On Usable Privacy and Security\t/conf/soups\t/conf/soups/soups\n" +
  "A\tS&P\tIEEE Symposium on Security and Privacy\t/conf/sp\t/conf/sp/sp\n" +
  "B\tSPAA\tACM Symposium on Parallelism in Algorithms and Architectures\t/conf/spaa\t/conf/spaa/spaa\n" +
  "C\tSPIN\tInternational SPIN Workshop on Model Checking of Software\t/conf/spin\t/conf/spin/spin\n" +
  "B\tSRDS\tIEEE International Symposium on Reliable Distributed Systems\t/conf/srds\t/conf/srds/srds\n" +
  "C\tSSTD\tInternational Symposium on Spatial and Temporal Databases\t/conf/ssd\t/conf/ssd/sstd\n" +
  "C\tSSDBM\tInternational Conference on Scientific and Statistical Database Management\t/conf/ssdbm\t/conf/ssdbm/ssdbm\n" +
  "C\tSTACS\tSymposium on Theoretical Aspects of Computer Science\t/conf/stacs\t/conf/stacs/stacs\n" +
  "A\tSTOC\tACM Symposium on the Theory of Computing\t/conf/stoc\t/conf/stoc/stoc\n" +
  "C\tSYSTOR\tACM International Systems and Storage Conference\t/conf/systor\t/conf/systor/systor\n" +
  "B\tISS\tACM International Conference on Interactive Tabletops and Surfaces\t/conf/tabletop\t/conf/tabletop/its\n" +
  "C\tTASE\tTheoretical Aspects of Software Engineering Conference\t/conf/tase\t/conf/tase/tase\n" +
  "B\tTCC\tTheory of Cryptography Conference\t/conf/tcc\t/conf/tcc/tcc\n" +
  "C\tTrustCom\tIEEE International Conference on Trust,Security and Privacy in Computing and Communications\t/conf/trustcom\t/conf/trustcom/trustcom\n" +
  "B\tUAI\tInternational Conference on Uncertainty in Artificial Intelligence\t/conf/uai\t/conf/uai/uai\n" +
  "C\tUIC\tIEEE International Conference on Ubiquitous Intelligence and Computing\t/conf/uic\t/conf/uic/uic\n" +
  "A\tUIST\tACM Symposium on User Interface Software and Technology\t/conf/uist\t/conf/uist/uist\n" +
  "A\tACM SIGOPS ATC\tACM SIGOPS Annual Technical Conference\t/conf/usenix\t/conf/usenix/usenix\n" +
  "A\tUSENIX Security\tUSENIX Security Symposium\t/conf/uss\t/conf/uss/uss\n" +
  "C\tHotSec\tUSENIX Workshop on Hot Topics in Security\t/conf/uss/\t/conf/uss/hotsec\n" +
  "B\tVEE\tInternational Conference on Virtual Execution Environments\t/conf/vee\t/conf/vee/vee\n" +
  "B\tEuroVis\tEurographics Conference on Visualization\t/conf/vissym\t/conf/vissym/eurovis\n" +
  "A\tIEEE VIS\tIEEE Visualization Conference\t/conf/visualization\t/conf/visualization/visualization\n" +
  "A\tVLDB\tInternational Conference on Very Large Data Bases\t/conf/vldb\t/conf/vldb/vldb\n" +
  "B\tVMCAI\tInternational Conference on Verification, Model Checking and Abstract Interpretation\t/conf/vmcai\t/conf/vmcai/vmcai\n" +
  "A\tVR\tIEEE Conference on Virtual Reality and 3D User Interfaces\t/conf/vr\t/conf/vr/vr\n" +
  "C\tVRST\tACM Symposium on Virtual Reality Software and Technology\t/conf/vrst\t/conf/vrst/vrst\n" +
  "C\tVTS\tIEEE VLSI Test Symposium\t/conf/vts\t/conf/vts/vts\n" +
  "C\tWAIM\tInternational Conference on Web Age Information Management\t/conf/waim\t/conf/waim/waim\n" +
  "C\tWASA\tThe International Conference on Wireless Artificial Intelligent Computing Systems and Applications\t/conf/wasa\t/conf/wasa/wasa\n" +
  "C\tWCNC\tIEEE Wireless Communications and Networking Conference\t/conf/wcnc\t/conf/wcnc/wcnc\n" +
  "B\tSANER\tInternational Conference on Software Analysis, Evolution, and Reengineering\t/conf/wcre\t/conf/wcre/wcre\n" +
  "C\tWebDB\tInternational Workshop on Web and Databases\t/conf/webdb\t/conf/webdb/webdb\n" +
  "C\tWICSA\tWorking IEEE/IFIP Conference on Software Architecture\t/conf/wicsa\t/conf/wicsa/wicsa\n" +
  "B\tWINE\tConference on Web and Internet Economics\t/conf/wine\t/conf/wine/wine\n" +
  "C\tWISA\tWeb Information Systems and Applications\t/conf/wisa\t/conf/wisa/wisa\n" +
  "B\tWISE\tWeb Information Systems Engineering Conference\t/conf/wise\t/conf/wise/wise\n" +
  "C\tWiSec\tACM Conference on Security and Privacy in Wireless and Mobile Networks\t/conf/wisec\t/conf/wisec/wisec\n" +
  "C\tWoWMoM\tIEEE International Symposium on a World of Wireless, Mobile and Multimedia Networks\t/conf/wowmom\t/conf/wowmom/wowmom\n" +
  "B\tWSDM\tACM International Conference on Web Search and Data Mining\t/conf/wsdm\t/conf/wsdm/wsdm\n" +
  "A\tWWW\tThe Web Conference\t/conf/www\t/conf/www/www\n" +
  "B\tAAMAS\tAutonomous Agents and Multi-Agent Systems\t/journals/aamas\t/journals/aamas/aamas\n" +
  "C\tACTA\tActa Informatica\t/journals/acta\t/journals/acta/acta\n" +
  "C\t\tAd hoc Networks\t/journals/adhoc\t/journals/adhoc/adhoc\n" +
  "B\tAEI\tAdvanced Engineering Informatics\t/journals/aei\t/journals/aei/aei\n" +
  "A\tAI\tArtificial Intelligence\t/journals/ai\t/journals/ai/ai\n" +
  "B\tAlgorithmica\tAlgorithmica\t/journals/algorithmica\t/journals/algorithmica/algorithmica\n" +
  "C\t\tArtificial Life\t/journals/alife\t/journals/alife/alife\n" +
  "C\tAPAL\tAnnals of Pure and Applied Logic\t/journals/apal\t/journals/apal/apal\n" +
  "C\t\tApplied Intelligence\t/journals/apin\t/journals/apin/apin\n" +
  "C\tAIM\tArtificial Intelligence in Medicine\t/journals/artmed\t/journals/artmed/artmed\n" +
  "B\tASE\tAutomated Software Engineering\t/journals/ase\t/journals/ase/ase\n" +
  "B\tBCRA\tBlockchain: Research and Applications\t/journals/bcra\t/journals/bcra/bcra\n" +
  "C\tBIT\tBehaviour & Information Technology\t/journals/behaviourIT\t/journals/behaviourIT/behaviourIT\n" +
  "B\t\tBriefings in Bioinformatics\t/journals/bib\t/journals/bib/bib\n" +
  "A\tISMB\tInternational conference on Intelligent Systems for Molecular Biology\t/journals/bioinformatics\t/journals/bioinformatics/bioinformatics\n" +
  "C\t\tBMC Bioinformatics\t/journals/bmcbi\t/journals/bmcbi/bmcbi\n" +
  "B\tCAD\tComputer-Aided Design\t/journals/cad\t/journals/cad/cad\n" +
  "B\tCAGD\tComputer Aided Geometric Design\t/journals/cagd\t/journals/cagd/cagd\n" +
  "C\t\tCybernetics and Systems\t/journals/cas\t/journals/cas/cas\n" +
  "B\tCC\tComputational Complexity\t/journals/cc\t/journals/cc/cc\n" +
  "C\tCCF-THPC\tCCF Transactions on High Performance Computing\t/journals/ccfthpc\t/journals/ccfthpc/ccfthpc\n" +
  "B\tCCF TPCI\tCCF Transactions on Pervasive Computing and Interaction\t/journals/ccftpci\t/journals/ccftpci/ccftpci\n" +
  "C\tC&G\tComputers & Graphics\t/journals/cg\t/journals/cg/cg\n" +
  "B\tCGF\tComputer Graphics Forum\t/journals/cgf\t/journals/cgf/cgf\n" +
  "A\tSCIS\tScience China Information Sciences\t/journals/chinaf\t/journals/chinaf/chinaf\n" +
  "C\t\tComputational Intelligence\t/journals/ci\t/journals/ci/ci\n" +
  "B\t\tThe Computer Journal\t/journals/cj\t/journals/cj/cj\n" +
  "C\tCL\tComputer Languages, Systems and Structures\t/journals/cl\t/journals/cl/cl\n" +
  "C\tCLSR\tComputer Law & Security Review\t/journals/clsr\t/journals/clsr/clsr\n" +
  "B\tCN\tComputer Networks\t/journals/cn\t/journals/cn/cn\n" +
  "B\t\tComputational Linguistics\t/journals/coling\t/journals/coling/coling\n" +
  "C\tCC\tComputer Communications\t/journals/comcom\t/journals/comcom/comcom\n" +
  "C\tCGTA\tComputational Geometry: Theory and Applications\t/journals/comgeo\t/journals/comgeo/comgeo\n" +
  "B\t\tComputers & Security\t/journals/compsec\t/journals/compsec/compsec\n" +
  "C\t\tConcurrency and Computation: Practice and Experience\t/journals/concurrency\t/journals/concurrency/concurrency\n" +
  "C\t\tConnection Science\t/journals/connection\t/journals/connection/connection\n" +
  "P\t\tarXiv\t/journals/corr\t/journals/corr/corr\n" +
  "B\tCSCW\tComputer Supported Cooperative Work\t/journals/cscw\t/journals/cscw/cscw\n" +
  "C\t\tComputer Speech & Language\t/journals/csl\t/journals/csl/csl\n" +
  "C\tGMOD\tGraphical Models\t/journals/cvgip\t/journals/cvgip/cvgip\n" +
  "B\tCVIU\tComputer Vision and Image Understanding\t/journals/cviu\t/journals/cviu/cviu\n" +
  "B\tCVMJ\tComputational Visual Media\t/journals/cvm\t/journals/cvm/cvm\n" +
  "B\tCybersecurity\tCybersecurity\t/journals/cybersec\t/journals/cybersec/cybersec\n" +
  "C\tDAM\tDiscrete Applied Mathematics\t/journals/dam\t/journals/dam/dam\n" +
  "B\tDSE\tData Science and Engineering\t/journals/dase\t/journals/dase/dase\n" +
  "B\tDMKD\tData Mining and Knowledge Discovery\t/journals/datamine\t/journals/datamine/datamine\n" +
  "C\tDC\tDistributed Computing\t/journals/dc\t/journals/dc/dc\n" +
  "B\t\tDesigns, Codes and Cryptography\t/journals/dcc\t/journals/dcc/dcc\n" +
  "C\tDCG\tDiscrete & Computational Geometry\t/journals/dcg\t/journals/dcg/dcg\n" +
  "C\tACM DLT\tACM Distributed Ledger Technologies: Research and Practice\t/journals/distribledger\t/journals/distribledger/distribledger\n" +
  "B\tDKE\tData and Knowledge Engineering\t/journals/dke\t/journals/dke/dke\n" +
  "C\tDPD\tDistributed and Parallel Databases\t/journals/dpd\t/journals/dpd/dpd\n" +
  "C\tDSS\tDecision Support Systems\t/journals/dss\t/journals/dss/dss\n" +
  "C\tEAAI\tEngineering Applications of Artificial Intelligence\t/journals/eaai\t/journals/eaai/eaai\n" +
  "B\t\tEvolutionary Computation\t/journals/ec\t/journals/ec/ec\n" +
  "B\tEJIS\tEuropean Journal of Information Systems\t/journals/ejis\t/journals/ejis/ejis\n" +
  "C\t\tEURASIP Journal on Information Security\t/journals/ejisec\t/journals/ejisec/ejisec\n" +
  "C\t\tExpert Systems\t/journals/es\t/journals/es/es\n" +
  "B\tESE\tEmpirical Software Engineering\t/journals/ese\t/journals/ese/ese\n" +
  "C\tESWA\tExpert Systems with Applications\t/journals/eswa\t/journals/eswa/eswa\n" +
  "C\tJETTA\tJournal of Electronic Testing-Theory and Applications\t/journals/et\t/journals/et/et\n" +
  "B\tFAC\tFormal Aspects of Computing\t/journals/fac\t/journals/fac/fac\n" +
  "B\tFCS\tFrontiers of Computer Science\t/journals/fcsc\t/journals/fcsc/fcsc\n" +
  "C\tFGCS\tFuture Generation Computer Systems\t/journals/fgcs\t/journals/fgcs/fgcs\n" +
  "B\tFMSD\tFormal Methods in System Design\t/journals/fmsd\t/journals/fmsd/fmsd\n" +
  "C\t\tFuzzy Sets and Systems\t/journals/fss\t/journals/fss/fss\n" +
  "C\tFUIN\tFundamenta Informaticae\t/journals/fuin\t/journals/fuin/fuin\n" +
  "B\t\tGeoInformatica\t/journals/geoinformatica\t/journals/geoinformatica/geoinformatica\n" +
  "C\tIJGIS\tInternational Journal of Geographical Information Science\t/journals/gis\t/journals/gis/gis\n" +
  "C\tJGC\tJournal of Grid computing\t/journals/grid\t/journals/grid/grid\n" +
  "C\tHCC\tHigh-Confidence Computing\t/journals/hcc\t/journals/hcc/hcc\n" +
  "C\tHEALTH\tACM Transactions on Computing for Healthcare\t/journals/health\t/journals/health/health\n" +
  "B\tHCI\tHuman-Computer Interaction\t/journals/hhci\t/journals/hhci/hhci\n" +
  "C\tI&M\tInformation & Management\t/journals/iam\t/journals/iam/iam\n" +
  "A\tIANDC\tInformation and Computation\t/journals/iandc\t/journals/iandc/iandc\n" +
  "C\tIDA\tIntelligent Data Analysis\t/journals/ida\t/journals/ida/ida\n" +
  "B\tIETS\tIET Software\t/journals/iee\t/journals/iee/iee-s\n" +
  "C\t\tIET Communications\t/journals/iet-com\t/journals/iet-com/iet-com\n" +
  "C\tIET-CVI\tIET Computer Vision\t/journals/iet-cvi\t/journals/iet-cvi/iet-cvi\n" +
  "C\t\tIET Information Security\t/journals/iet-ifs\t/journals/iet-ifs/iet-ifs\n" +
  "C\tIET-IPR\tIET Image Processing\t/journals/iet-ipr\t/journals/iet-ipr/iet-ipr\n" +
  "B\tIETS\tIET Software\t/journals/iet-sen\t/journals/iet-sen/iet-sen\n" +
  "C\t\tIET Signal Processing\t/journals/iet-spr\t/journals/iet-spr/iet-spr\n" +
  "B\tIJAR\tInternational Journal of Approximate Reasoning\t/journals/ijar\t/journals/ijar/ijar\n" +
  "C\tIJCIA\tInternational Journal of Computational Intelligence and Applications\t/journals/ijcia\t/journals/ijcia/ijcia\n" +
  "C\tIJCIS\tInternational Journal of Cooperative Information Systems\t/journals/ijcis\t/journals/ijcis/ijcis\n" +
  "A\tIJCV\tInternational Journal of Computer Vision\t/journals/ijcv\t/journals/ijcv/ijcv\n" +
  "C\tIJDAR\tInternational Journal on Document Analysis and Recognition\t/journals/ijdar\t/journals/ijdar/ijdar\n" +
  "B\tIJHCI\tInternational Journal of Human-Computer Interaction\t/journals/ijhci\t/journals/ijhci/ijhci\n" +
  "C\tIJICS\tInternational Journal of Information and Computer Security\t/journals/ijics\t/journals/ijics/ijics\n" +
  "C\tIJIS\tInternational Journal of Intelligent Systems\t/journals/ijis\t/journals/ijis/ijis\n" +
  "C\tIJISP\tInternational Journal of Information Security and Privacy\t/journals/ijisp\t/journals/ijisp/ijisp\n" +
  "C\tIJKM\tInternational Journal of Knowledge Management\t/journals/ijkm\t/journals/ijkm/ijkm\n" +
  "A\tIJHCS\tInternational Journal of Human-Computer Studies\t/journals/ijmms\t/journals/ijmms/ijmms\n" +
  "C\tIJNS\tInternational Journal of Neural Systems\t/journals/ijns\t/journals/ijns/ijns\n" +
  "C\t\tNeurocomputing\t/journals/ijon\t/journals/ijon/ijon\n" +
  "C\tIJPRAI\tInternational Journal of Pattern Recognition and Artificial Intelligence\t/journals/ijprai\t/journals/ijprai/ijprai\n" +
  "C\tIJSEKE\tInternational Journal of Software Engineering and Knowledge Engineering\t/journals/ijseke\t/journals/ijseke/ijseke\n" +
  "C\tIJSWIS\tInternational Journal on Semantic Web and Information Systems\t/journals/ijswis\t/journals/ijswis/ijswis\n" +
  "C\tIJUFKS\tInternational Journal of Uncertainty, Fuzziness and Knowledge-Based Systems\t/journals/ijufks\t/journals/ijufks/ijufks\n" +
  "C\tIMCS\tInformation and Computer Security\t/journals/imcs\t/journals/imcs/imcs\n" +
  "B\tINFORMS\tINFORMS Journal on Computing\t/journals/informs\t/journals/informs/informs\n" +
  "B\tIST\tInformation and Software Technology\t/journals/infsof\t/journals/infsof/infsof\n" +
  "C\tIntegration\tIntegration, the VLSI Journal\t/journals/integration\t/journals/integration/integration\n" +
  "C\tIOT\tIEEE Internet of Things Journal\t/journals/iotj\t/journals/iotj/iotj\n" +
  "C\tIPL\tInformation Processing Letters\t/journals/ipl\t/journals/ipl/ipl\n" +
  "B\tIPM\tInformation Processing and Management\t/journals/ipm\t/journals/ipm/ipm\n" +
  "C\t\tDiscover Computing\t/journals/ir\t/journals/ir/ir\n" +
  "B\tIS\tInformation Systems\t/journals/is\t/journals/is/is\n" +
  "B\t\tInformation Sciences\t/journals/isci\t/journals/isci/isci\n" +
  "C\tJISA\tJournal of Information Security and Applications\t/journals/istr\t/journals/istr/istr\n" +
  "C\tIVC\tImage and Vision Computing\t/journals/ivc\t/journals/ivc/ivc\n" +
  "B\tIWC\tInteracting with Computers\t/journals/iwc\t/journals/iwc/iwc\n" +
  "A \tJACM\tJournal of the ACM\t/journals/jacm\t/journals/jacm/jacm\n" +
  "B\tJAIR\tJournal of Artificial Intelligence Research\t/journals/jair\t/journals/jair/jair\n" +
  "B\tJAMIA\tJournal of the American Medical Informatics Association\t/journals/jamia\t/journals/jamia/jamia\n" +
  "B\t\tJournal of Automated Reasoning\t/journals/jar\t/journals/jar/jar\n" +
  "B\tJASIST\tJournal of the Association for Information Science and Technology\t/journals/jasis\t/journals/jasis/jasis\n" +
  "C\tJBI\tJournal of Biomedical Informatics\t/journals/jbi\t/journals/jbi/jbi\n" +
  "C\tJCOMPLEXITY\tJournal of Complexity\t/journals/jc\t/journals/jc/jc\n" +
  "C\tJCIS\tJournal of Computer Information Systems\t/journals/jcis\t/journals/jcis/jcis\n" +
  "B\tJCS\tJournal of Computer Security\t/journals/jcs\t/journals/jcs/jcs\n" +
  "B\tJCSS\tJournal of Computer and System Sciences\t/journals/jcss\t/journals/jcss/jcss\n" +
  "B\tJCST\tJournal of Computer Science and Technology\t/journals/jcst\t/journals/jcst/jcst\n" +
  "C\tJDM\tJournal of Database Management\t/journals/jdm\t/journals/jdm/jdm\n" +
  "C\tTOCE\tACM Transactions on Computing Education\t/journals/jeric\t/journals/jeric/jeric\n" +
  "C\tJETAI\tJournal of Experimental and Theoretical Artificial Intelligence\t/journals/jetai\t/journals/jetai/jetai\n" +
  "C\tJETC\tACM Journal on Emerging Technologies in Computing Systems\t/journals/jetc\t/journals/jetc/jetc\n" +
  "B\tJFP\tJournal of Functional Programming\t/journals/jfp\t/journals/jfp/jfp\n" +
  "C\tJGITM\tJournal of Global Information Technology Management\t/journals/jgim\t/journals/jgim/jgim\n" +
  "B\tJGO\tJournal of Global Optimization\t/journals/jgo\t/journals/jgo/jgo\n" +
  "C\tJIIS\tJournal of Intelligent Information Systems\t/journals/jiis\t/journals/jiis/jiis\n" +
  "C\tJLAMP\tJournal of Logical and Algebraic Methods in Programming\t/journals/jlap\t/journals/jlp/jlp\n" +
  "A\tJMLR\tJournal of Machine Learning Research\t/journals/jmlr\t/journals/jmlr/jmlr\n" +
  "C\tJNCA\tJournal of Network and Computer Applications\t/journals/jnca\t/journals/jnca/jnca\n" +
  "A\t\tJournal of Cryptology\t/journals/joc\t/journals/joc/joc\n" +
  "B\tJPDC\tJournal of Parallel and Distributed Computing\t/journals/jpdc\t/journals/jpdc/jpdc\n" +
  "B\tJSA\tJournal of Systems Architecture: Embedded Software Design\t/journals/jsa\t/journals/jsa/jsa\n" +
  "A\tJSAC\tIEEE Journal on Selected Areas in Communications\t/journals/jsac\t/journals/jsac/jsac\n" +
  "B\tJSC\tJournal of Symbolic Computation\t/journals/jsc\t/journals/jsc/jsc\n" +
  "C\tJSIS\tJournal of Strategic Information Systems\t/journals/jsis\t/journals/jsis/jsis\n" +
  "B\tJSS\tJournal of Systems and Software\t/journals/jss\t/journals/jss/jss\n" +
  "C\tJSL\tJournal of Symbolic Logic\t/journals/jsyml\t/journals/jsyml/jsyml\n" +
  "C\tCAVW\tComputer animation & virtual worlds\t/journals/jvca\t/journals/jvca/jvca\n" +
  "C\tJVCIR\tJournal of Visual Communication and Image Representation\t/journals/jvcir\t/journals/jvcir/jvcir\n" +
  "C\tJWE\tJournal of Web Engineering\t/journals/jwe\t/journals/jwe/jwe\n" +
  "C\tEITEE\tENGINEERING Information Technology & Electronic Engineering\t/journals/jzusc\t/journals/jzusc/jzusc\n" +
  "B\tKAIS\tKnowledge and Information Systems\t/journals/kais\t/journals/kais/kais\n" +
  "C\tKBS\tKnowledge-Based Systems\t/journals/kbs\t/journals/kbs/kbs\n" +
  "C\t\tIEEE Geoscience and Remote Sensing Letters\t/journals/lgrs\t/journals/lgrs/lgrs\n" +
  "C\tLMCS\tLogical Methods in Computer Science\t/journals/lmcs\t/journals/lmcs/lmcs\n" +
  "C\tLOGCOM\tJournal of Logic and Computation\t/journals/logcom\t/journals/logcom/logcom\n" +
  "C\t\tMedical Image Analysis\t/journals/mia\t/journals/mia/mia\n" +
  "B\t\tMachine Learning\t/journals/ml\t/journals/ml/ml\n" +
  "C\tMS\tMultimedia Systems\t/journals/mms\t/journals/mms/mms\n" +
  "C\tMONET\tMobile Networks and Applications\t/journals/monet\t/journals/monet/monet\n" +
  "B\tMSCS\tMathematical Structures in Computer Science\t/journals/mscs\t/journals/mscs/mscs\n" +
  "C\t\tTheory of Computing Systems\t/journals/mst\t/journals/mst/mst\n" +
  "C\t\tMachine Translation\t/journals/mt\t/journals/mt/mt\n" +
  "C\tMTA\tMultimedia Tools and Applications\t/journals/mta\t/journals/mta/mta\n" +
  "C\t\tMachine Vision and Applications\t/journals/mva\t/journals/mva/mva\n" +
  "C\t\tNatural Computing\t/journals/nc\t/journals/nc/nc\n" +
  "C\tNCA\tNeural Computing and Applications\t/journals/nca\t/journals/nca/nca\n" +
  "B\t\tNeural Computation\t/journals/neco\t/journals/neco/neco\n" +
  "C\t\tNetworks\t/journals/networks\t/journals/networks/networks\n" +
  "C\tNLE\tNatural Language Engineering\t/journals/nle\t/journals/nle/nle\n" +
  "B\t\tNeural Networks\t/journals/nn\t/journals/nn/nn\n" +
  "C\tNPL\tNeural Processing Letters\t/journals/npl\t/journals/npl/npl\n" +
  "C\tPAA\tPattern Analysis and Applications\t/journals/paa\t/journals/paa/paa\n" +
  "C\tPACMHCI\tProceedings of the ACM on Human-Computer Interaction\t/journals/pacmhci\t/journals/pacmhci/pacmhci\n" +
  "C\tPACM PL\tProceedings of the ACM on Programming Languages\t/journals/pacmpl\t/journals/pacmpl/pacmpl\n" +
  "A\tTPAMI\tIEEE Transactions on Pattern Analysis and Machine Intelligence\t/journals/pami\t/journals/pami/pami\n" +
  "B\t\tParallel Computing\t/journals/pc\t/journals/pc/pc\n" +
  "B\t\tPerformance Evaluation: An International Journal\t/journals/pe\t/journals/pe/pe\n" +
  "C\tPMC\tPervasive and Mobile Computing\t/journals/percom\t/journals/percom/percom\n" +
  "A \tProc. IEEE\tProceedings of the IEEE\t/journals/pieee\t/journals/pieee/pieee\n" +
  "B\t\tPLOS Computational Biology\t/journals/ploscb\t/journals/ploscb/ploscb\n" +
  "C\tPPNA\tPeer-to-Peer Networking and Applications\t/journals/ppna\t/journals/ppna/ppna\n" +
  "B\tPR\tPattern Recognition\t/journals/pr\t/journals/pr/pr\n" +
  "C\tPRL\tPattern Recognition Letters\t/journals/prl\t/journals/prl/prl\n" +
  "C\tPUC\tPersonal and Ubiquitous Computing\t/journals/puc\t/journals/puc/puc\n" +
  "A\tVLDB\tInternational Conference on Very Large Data Bases\t/journals/pvldb\t/journals/pvldb/pvldb\n" +
  "B\tRE\tRequirements Engineering\t/journals/re\t/journals/re/re\n" +
  "C\tRTS\tReal-Time Systems\t/journals/rts\t/journals/rts/rts\n" +
  "C\tSCN\tSecurity and Communication Networks\t/journals/scn\t/journals/scn/scn\n" +
  "B\tSCP\tScience of Computer Programming\t/journals/scp\t/journals/scp/scp\n" +
  "A\tSICOMP\tSIAM Journal on Computing\t/journals/siamcomp\t/journals/siamcomp/siamcomp\n" +
  "C\tSIDMA\tSIAM Journal on Discrete Mathematics\t/journals/siamdm\t/journals/siamdm/siamdm\n" +
  "B\tSIIMS\tSIAM Journal on Imaging Sciences\t/journals/siamis\t/journals/siamis/siamis\n" +
  "C\tSIGPRO\tSignal Processing\t/journals/sigpro\t/journals/sigpro/sigpro\n" +
  "C\tSIGSPATIAL\tACM Special Interest Group on Spatial Information\t/journals/sigspatial\t/journals/sigspatial/sigspatial\n" +
  "B\t\tJournal of Software: Evolution and Process\t/journals/smr\t/journals/smr/smr\n" +
  "C\tSOCA\tService Oriented Computing and Applications\t/journals/soca\t/journals/soca/soca\n" +
  "C\t\tSoft Computing\t/journals/soco\t/journals/soco/soco\n" +
  "B\tSoSyM\tSoftware and Systems Modeling\t/journals/sosym\t/journals/sosym/sosym\n" +
  "B\tSPE\tSoftware: Practice and Experience\t/journals/spe\t/journals/spe/spe\n" +
  "B\tSPEECH\tSpeech Communication\t/journals/speech\t/journals/speech/speech\n" +
  "C\tSPIC\tSignal Processing: Image Communication\t/journals/spic\t/journals/spic/spic\n" +
  "C\tSPL\tIEEE Signal Processing Letters\t/journals/spl\t/journals/spl/spl\n" +
  "C\tSQJ\tSoftware Quality Journal\t/journals/sqj\t/journals/sqj/sqj\n" +
  "C\tSTTT\tInternational Journal of Software Tools for Technology Transfer\t/journals/sttt\t/journals/sttt/sttt\n" +
  "B\tSTVR\tSoftware Testing, Verification and Reliability\t/journals/stvr\t/journals/stvr/stvr\n" +
  "B\tTAAS\tACM Transactions on Autonomous and Adaptive Systems\t/journals/taas\t/journals/taas/taas\n" +
  "B\tTACL\tTransactions of the Association for Computational Linguistics\t/journals/tacl\t/journals/tacl/tacl\n" +
  "A\tTACO\tACM Transactions on Architecture and Code Optimization\t/journals/taco\t/journals/taco/taco\n" +
  "B\tTAC\tIEEE Transactions on Affective Computing\t/journals/taffco\t/journals/taffco/taffco\n" +
  "B\tTALG\tACM Transactions on Algorithms\t/journals/talg\t/journals/talg/talg\n" +
  "C\tTALLIP\tACM Transactions on Asian and Low-Resource Language Information Processing\t/journals/talip\t/journals/talip/talip\n" +
  "B\tTAP\tACM Transactions on Applied Perception\t/journals/tap\t/journals/tap/tap\n" +
  "B\tTASAE\tIEEE Transactions on Automation Science and Engineering\t/journals/tase\t/journals/tase/tase\n" +
  "B\tTASLP\tIEEE Transactions on Audio, Speech and Language Processing\t/journals/taslp\t/journals/taslp/taslp\n" +
  "C\tTBD\tIEEE Transactions on Big Data\t/journals/tbd\t/journals/tbd/tbd\n" +
  "A\tTC\tIEEE Transactions on Computers\t/journals/tc\t/journals/tc/tc\n" +
  "A\tTCAD\tIEEE Transactions on Computer-Aided Design of Integrated Circuits and Systems\t/journals/tcad\t/journals/tcad/tcad\n" +
  "C\tTCASI\tIEEE Transactions on Circuits and Systems I: Regular Papers\t/journals/tcasI\t/journals/tcasI/tcasI\n" +
  "B\tTCBB\tIEEE/ACM Transactions on Computational Biology and Bioinformatics\t/journals/tcbb\t/journals/tcbb/tcbb\n" +
  "B\tTCC\tIEEE Transactions on Cloud Computing\t/journals/tcc\t/journals/tcc/tcc\n" +
  "C\tTG\tIEEE Transactions on Games\t/journals/tciaig\t/journals/tciaig/tciaig\n" +
  "B\tTCOM\tIEEE Transactions on Communications\t/journals/tcom\t/journals/tcom/tcom\n" +
  "C\tTCPS\tACM Transactions on Cyber-Physical Systems\t/journals/tcps\t/journals/tcps/tcps\n" +
  "B\tTCS\tTheoretical Computer Science\t/journals/tcs\t/journals/tcs/tcs\n" +
  "C\tTCSS\tIEEE Transactions on Computational Social Systems\t/journals/tcss\t/journals/tcss/tcss\n" +
  "B\tTCSVT\tIEEE Transactions on Circuits and Systems for Video Technology\t/journals/tcsv\t/journals/tcsv/tcsv\n" +
  "B\t\tIEEE Transactions on Cybernetics\t/journals/tcyb\t/journals/tsmc/tsmcb\n" +
  "A\tTDSC\tIEEE Transactions on Dependable and Secure Computing\t/journals/tdsc\t/journals/tdsc/tdsc\n" +
  "B\tTEC\tIEEE Transactions on Evolutionary Computation\t/journals/tec\t/journals/tec/tec\n" +
  "B\tTECS\tACM Transactions on Embedded Computing Systems\t/journals/tecs\t/journals/tecs/tecs\n" +
  "C\tTELO\tACM Transactions on Evolutionary Learning and Optimization\t/journals/telo\t/journals/telo/telo\n" +
  "B\tTFS\tIEEE Transactions on Fuzzy Systems\t/journals/tfs\t/journals/tfs/tfs\n" +
  "B\tTGARS\tIEEE Transactions on Geoscience and Remote Sensing\t/journals/tgrs\t/journals/tgrs/tgrs\n" +
  "B\t\tIEEE Transactions on Human-Machine Systems\t/journals/thms\t/journals/tsmc/tsmcc\n" +
  "C\tTHRI\tACM Transactions on Human-Robot Interaction\t/journals/thri\t/journals/thri/thri\n" +
  "A\tTIFS\tIEEE Transactions on Information Forensics and Security\t/journals/tifs\t/journals/tifs/tifs\n" +
  "C\tTII\tIEEE Transactions on Industrial Informatics\t/journals/tii\t/journals/tii/tii\n" +
  "C\tTIIS\tACM Transactions on Interactive Intelligent Systems\t/journals/tiis\t/journals/tiis/tiis\n" +
  "A\tTIP\tIEEE Transactions on Image Processing\t/journals/tip\t/journals/tip/tip\n" +
  "B\tTOPS\tACM Transactions on Privacy and Security\t/journals/tissec\t/journals/tissec/tissec\n" +
  "C\tTIST\tACM Transactions on Intelligent Systems and Technology\t/journals/tist\t/journals/tist/tist\n" +
  "A\tTIT\tIEEE Transactions on Information Theory\t/journals/tit\t/journals/tit/tit\n" +
  "C\tJBHI\tIEEE Journal of Biomedical and Health Informatics\t/journals/titb\t/journals/titb/titb\n" +
  "B\tTITS\tIEEE Transactions on Intelligent Transportation Systems\t/journals/tits\t/journals/tits/tits\n" +
  "C\tTJSC\tThe Journal of Supercomputing\t/journals/tjs\t/journals/tjs/tjs\n" +
  "B\tTKDD\tACM Transactions on Knowledge Discovery from Data\t/journals/tkdd\t/journals/tkdd/tkdd\n" +
  "A \tTKDE\tIEEE Transactions on Knowledge and Data Engineering\t/journals/tkde\t/journals/tkde/tkde\n" +
  "A\tTMC\tIEEE Transactions on Mobile Computing\t/journals/tmc\t/journals/tmc/tmc\n" +
  "B\tTMI\tIEEE Transactions on Medical Imaging\t/journals/tmi\t/journals/tmi/tmi\n" +
  "A\tTMM\tIEEE Transactions on Multimedia\t/journals/tmm\t/journals/tmm/tmm\n" +
  "B\tTNNLS\tIEEE Transactions on Neural Networks and learning systems\t/journals/tnn\t/journals/tnn/tnn\n" +
  "C\tTNSM\tIEEE Transactions on Network and Service Management\t/journals/tnsm\t/journals/tnsm/tnsm\n" +
  "A\tTOCHI\tACM Transactions on Computer-Human Interaction\t/journals/tochi\t/journals/tochi/tochi\n" +
  "B\tTOCL\tACM Transactions on Computational Logic\t/journals/tocl\t/journals/tocl/tocl\n" +
  "A\tTOCS\tACM Transactions on Computer Systems\t/journals/tocs\t/journals/tocs/tocs\n" +
  "B\tTODAES\tACM Transactions on Design Automation of Electronic Systems\t/journals/todaes\t/journals/todaes/todaes\n" +
  "A \tTODS\tACM Transactions on Database Systems\t/journals/tods\t/journals/tods/tods\n" +
  "A\tTOG\tACM Transactions on Graphics\t/journals/tog\t/journals/tog/tog\n" +
  "A \tTOIS\tACM Transactions on Information Systems\t/journals/tois\t/journals/tois/tois\n" +
  "B\tTOIT\tACM Transactions on Internet Technology\t/journals/toit\t/journals/toit/toit\n" +
  "B\tTOMM\tACM Transactions on Multimedia Computing, Communications and Applications\t/journals/tomccap\t/journals/tomccap/tomccap\n" +
  "B\tTOMS\tACM Transactions on Mathematical Software\t/journals/toms\t/journals/toms/toms\n" +
  "A\tTON\tIEEE Transactions on Networking\t/journals/ton\t/journals/ton/ton\n" +
  "A\tTOPLAS\tACM Transactions on Programming Languages and Systems\t/journals/toplas\t/journals/toplas/toplas\n" +
  "C\tTORS\tACM Transactions on Recommender Systems\t/journals/tors\t/journals/tors/tors\n" +
  "A\tTOS\tACM Transactions on Storage\t/journals/tos\t/journals/tos/tos\n" +
  "A\tTOSEM\tACM Transactions on Software Engineering and Methodology\t/journals/tosem\t/journals/tosem/tosem\n" +
  "B\tTOSN\tACM Transactions on Sensor Networks\t/journals/tosn\t/journals/tosn/tosn\n" +
  "A\tTPDS\tIEEE Transactions on Parallel and Distributed Systems\t/journals/tpds\t/journals/tpds/tpds\n" +
  "C\tTPLP\tTheory and Practice of Logic Programming\t/journals/tplp\t/journals/tplp/tplp\n" +
  "C\tTQC\tACM Transactions in Quantum Computing\t/journals/tqc\t/journals/tqc/tqc\n" +
  "C\t\tIEEE Transactions on Reliability\t/journals/tr\t/journals/tr/tr\n" +
  "B\tTRETS\tACM Transactions on Reconfigurable Technology and Systems\t/journals/trets\t/journals/trets/trets\n" +
  "B\tTR\tIEEE Transactions on Robotics\t/journals/trob\t/journals/trob/trob\n" +
  "A\tTSC\tIEEE Transactions on Services Computing\t/journals/tsc\t/journals/tsc/tsc\n" +
  "A\tTSE\tIEEE Transactions on Software Engineering\t/journals/tse\t/journals/tse/tse\n" +
  "B\tTSMC\tIEEE Transactions on Systems, Man, and Cybernetics: Systems\t/journals/tsmc\t/journals/tsmc/tsmc\n" +
  "C\tTSUSC\tIEEE Transactions on Sustainable Computing\t/journals/tsusc\t/journals/tsusc/tsusc\n" +
  "A\tTVCG\tIEEE Transactions on Visualization and Computer Graphics\t/journals/tvcg\t/journals/tvcg/tvcg\n" +
  "B\tTVLSI\tIEEE Transactions on Very Large Scale Integration (VLSI) Systems\t/journals/tvlsi\t/journals/tvlsi/tvlsi\n" +
  "B\tTWC\tIEEE Transactions on Wireless Communications\t/journals/twc\t/journals/twc/twc\n" +
  "B\tTWEB\tACM Transactions on the Web\t/journals/tweb\t/journals/tweb\n" +
  "B\tUMUAI\tUser Modeling and User-Adapted Interaction\t/journals/umuai\t/journals/umuai/umuai\n" +
  "C\tTVC\tThe Visual Computer\t/journals/vc\t/journals/vc/vc\n" +
  "C\tVI\tVisual Informatics\t/journals/vi\t/journals/vi/vi\n" +
  "A \tVLDBJ\tThe VLDB Journal\t/journals/vldb\t/journals/vldb/vldb\n" +
  "C\tVRIH\tVirtual Reality & Intelligent Hardware\t/journals/vrih\t/journals/vrih/vrih\n" +
  "C\tWI\tWeb Intelligence\t/journals/wias\t/journals/wias/wias\n" +
  "C\tWCMC\tWireless Communications and Mobile Computing\t/journals/wicomm\t/journals/wicomm/wicomm\n" +
  "C\t\tWireless Networks\t/journals/winet\t/journals/winet/winet\n" +
  "B\tJWS\tJournal of Web Semantics\t/journals/ws\t/journals/ws/ws\n" +
  "B\tWWW\tThe Web Conference\t/journals/www\t/journals/www/www\n" +
  "B\tCognition\tCognition\t/nondblp/cognition\t/nondblp/cognition\n" +
  "C\tHotSec\tInternational Symposium on Hot Topics in Security\t/nondblp/hotsec\t/nondblp/hotsec\n" +
  "C\tIET-ITS\tIET Intelligent Transport Systems\t/nondblp/iet-its\t/nondblp/iet-its\n" +
  "B\tJASA\tJournal of the Acoustical Society of America\t/nondblp/jasa\t/nondblp/jasa\n" +
  "C\tJATS\tACM Journal on Autonomous Transportation Systems\t/nondblp/jats\t/nondblp/jats\n" +
  "C\tJCC\tInternational Conference on JointCloud Computing\t/nondblp/jointcloud\t/nondblp/jointcloud\n" +
  "B\tJSLHR\tJournal of Speech, Language, and Hearing Research\t/nondblp/jslhr\t/nondblp/jslhr\n";

var ccfRankFull = {};
var ccfRankAbbr = {};
var ccfRankDb = {};
var ccfRankUrl = {};
var ccfFullUrl = {};
var ccfAbbrFull = {};
for (x of ccfRankList.split("\n")) {
  y = x.split("\t");
  ccfFullUrl[y[2].toUpperCase()] = y[4];
  if (y[4] !== undefined && y[4] !== "") {
    ccfRankUrl[y[4]] = y[0];
    ccfRankAbbr[y[4]] = y[1];
    ccfRankFull[y[4]] = y[2];
    ccfRankDb[y[3]] = y[4];
    ccfAbbrFull[y[1]] = y[2].toUpperCase();
  }
}

const copyright = `/**
 * MIT License
 *  
 * WenyanLiu (https://github.com/WenyanLiu/CCFrank4dblp)
 * Copyright (c) 2019-2024 All Rights Reserved.
 * ------------------------------------------------------
 * Generated by dataGen.js
 * Last updated: ${new Date().toISOString().split("T")[0]}
 */
`;

const fs = require("fs");

// Helper function to write formatted JS files
function writeFormattedJS(filename, objName, data) {
  const content = `${copyright}
ccf.${objName} = ${JSON.stringify(data, null, 2)};
`;
  fs.writeFileSync(filename, content, "utf8");
}

// Write all files with consistent formatting and copyright
writeFormattedJS("ccfRankAbbr.js", "rankAbbrName", ccfRankAbbr);
writeFormattedJS("ccfRankFull.js", "rankFullName", ccfRankFull);
writeFormattedJS("ccfRankDb.js", "rankDb", ccfRankDb);
writeFormattedJS("ccfRankUrl.js", "rankUrl", ccfRankUrl);
writeFormattedJS("ccfFullUrl.js", "fullUrl", ccfFullUrl);
writeFormattedJS("ccfAbbrFull.js", "abbrFull", ccfAbbrFull);
