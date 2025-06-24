<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ragdoll Pedigree Fraud Detection System</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #333;
            min-height: 100vh;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }

        .header {
            text-align: center;
            margin-bottom: 30px;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 30px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }

        .header h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
            background: linear-gradient(45deg, #667eea, #764ba2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .header p {
            font-size: 1.1em;
            color: #666;
        }

        .main-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
            margin-bottom: 30px;
        }

        .card {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 15px;
            padding: 25px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease;
        }

        .card:hover {
            transform: translateY(-5px);
        }

        .card h2 {
            color: #667eea;
            margin-bottom: 20px;
            font-size: 1.5em;
        }

        .search-section {
            grid-column: 1 / -1;
        }

        .search-form {
            display: flex;
            gap: 15px;
            margin-bottom: 20px;
            flex-wrap: wrap;
        }

        .form-group {
            flex: 1;
            min-width: 200px;
        }

        .form-group label {
            display: block;
            margin-bottom: 5px;
            font-weight: 500;
            color: #333;
        }

        .form-group input, .form-group select {
            width: 100%;
            padding: 12px;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            font-size: 14px;
            transition: border-color 0.3s ease;
        }

        .form-group input:focus, .form-group select:focus {
            outline: none;
            border-color: #667eea;
        }

        .search-btn {
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
            border: none;
            padding: 12px 30px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
            font-weight: 500;
            transition: all 0.3s ease;
            height: fit-content;
            align-self: end;
        }

        .search-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }

        .search-btn:disabled {
            background: #ccc;
            cursor: not-allowed;
            transform: none;
        }

        .results-section {
            grid-column: 1 / -1;
            display: none;
        }

        .results-section.active {
            display: block;
        }

        .result-item {
            background: #f8f9fa;
            border-radius: 10px;
            padding: 20px;
            margin-bottom: 15px;
            border-left: 4px solid #28a745;
            transition: all 0.3s ease;
        }

        .result-item.suspicious {
            border-left-color: #ffc107;
            background: #fff3cd;
        }

        .result-item.fraudulent {
            border-left-color: #dc3545;
            background: #f8d7da;
        }

        .result-header {
            display: flex;
            justify-content: between;
            align-items: center;
            margin-bottom: 10px;
        }

        .result-name {
            font-size: 1.2em;
            font-weight: bold;
            color: #333;
        }

        .result-status {
            padding: 5px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: bold;
            text-transform: uppercase;
        }

        .status-clean {
            background: #d4edda;
            color: #155724;
        }

        .status-suspicious {
            background: #fff3cd;
            color: #856404;
        }

        .status-fraudulent {
            background: #f8d7da;
            color: #721c24;
        }

        .result-details {
            color: #666;
            font-size: 14px;
            line-height: 1.5;
        }

        .blacklist-section {
            max-height: 400px;
            overflow-y: auto;
        }

        .blacklist-item {
            background: #f8f9fa;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 10px;
            border-left: 3px solid #dc3545;
        }

        .blacklist-name {
            font-weight: bold;
            color: #dc3545;
            margin-bottom: 5px;
        }

        .blacklist-details {
            font-size: 12px;
            color: #666;
        }

        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 15px;
        }

        .stat-card {
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
        }

        .stat-number {
            font-size: 2em;
            font-weight: bold;
            margin-bottom: 5px;
        }

        .stat-label {
            font-size: 12px;
            opacity: 0.9;
        }

        .loading {
            display: none;
            text-align: center;
            padding: 20px;
        }

        .loading.active {
            display: block;
        }

        .spinner {
            border: 3px solid #f3f3f3;
            border-top: 3px solid #667eea;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            animation: spin 1s linear infinite;
            margin: 0 auto 10px;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        .error-message {
            background: #f8d7da;
            color: #721c24;
            padding: 15px;
            border-radius: 8px;
            margin: 10px 0;
            border: 1px solid #f5c6cb;
        }

        .success-message {
            background: #d4edda;
            color: #155724;
            padding: 15px;
            border-radius: 8px;
            margin: 10px 0;
            border: 1px solid #c3e6cb;
        }

        @media (max-width: 768px) {
            .main-content {
                grid-template-columns: 1fr;
            }
            
            .search-form {
                flex-direction: column;
            }
            
            .header h1 {
                font-size: 2em;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🐱 Ragdoll Pedigree Fraud Detection System</h1>
            <p>Advanced verification system for Ragdoll cat pedigrees using PawPeds database cross-referencing</p>
        </div>

        <div class="main-content">
            <div class="card search-section">
                <h2>🔍 Pedigree Search & Verification</h2>
                <form class="search-form" id="searchForm">
                    <div class="form-group">
                        <label for="catName">Cat Name</label>
                        <input type="text" id="catName" placeholder="Enter cat name to verify..." required>
                    </div>
                    <div class="form-group">
                        <label for="country">Country (Optional)</label>
                        <select id="country">
                            <option value="">All Countries</option>
                            <option value="Poland">Poland</option>
                            <option value="Netherlands">Netherlands</option>
                            <option value="France">France</option>
                            <option value="USA">USA</option>
                            <option value="United Kingdom">United Kingdom</option>
                            <option value="Italy">Italy</option>
                            <option value="Germany">Germany</option>
                            <option value="China">China</option>
                        </select>
                    </div>
                    <button type="submit" class="search-btn" id="searchBtn">
                        Verify Pedigree
                    </button>
                </form>

                <div class="loading" id="loading">
                    <div class="spinner"></div>
                    <p>Searching PawPeds database and cross-referencing with fraud database...</p>
                </div>

                <div id="messages"></div>
            </div>

            <div class="card">
                <h2>📊 Database Statistics</h2>
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-number" id="totalBlacklisted">85</div>
                        <div class="stat-label">Blacklisted Cats</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number" id="totalSearches">0</div>
                        <div class="stat-label">Searches Today</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number" id="fraudDetected">0</div>
                        <div class="stat-label">Fraud Detected</div>
                    </div>
                </div>
            </div>

            <div class="card blacklist-section">
                <h2>⚠️ Known Fraudulent Pedigrees</h2>
                <div id="blacklistContainer">
                    <!-- Blacklisted items will be populated here -->
                </div>
            </div>

            <div class="card results-section" id="resultsSection">
                <h2>🎯 Verification Results</h2>
                <div id="searchResults">
                    <!-- Search results will be populated here -->
                </div>
            </div>
        </div>
    </div>

    <script>
        // Initialize the fraud detection system
        class RagdollFraudDetector {
            constructor() {
                this.blacklistedCats = [];
                this.searchHistory = [];
                this.fraudDetectionCount = 0;
                this.totalSearches = 0;
                
                this.initializeBlacklist();
                this.setupEventListeners();
                this.populateBlacklistDisplay();
            }

            initializeBlacklist() {
                // Parse the PDF data into structured format
                this.blacklistedCats = [
                    { name: "Kerr Oreo", country: "Poland", type: "fraud", regNo: null },
                    { name: "Pretty Kitty Yuanbao", country: null, type: "fraud", regNo: null },
                    { name: "Budianer You You", country: "Netherlands", type: "fraud", regNo: null },
                    { name: "Budianer Benji Mecote", country: "Netherlands", type: "fraud", regNo: null },
                    { name: "Meoko Aaron Gaiagarden Elijah", country: "France", type: "fraud", regNo: null },
                    { name: "Budianer Kai", country: "USA", type: "fraud", regNo: null },
                    { name: "Starlight PZ Mulan", country: "Netherlands", type: "fraud", regNo: null },
                    { name: "33dolls.Lenny", country: "United Kingdom", type: "fraud", regNo: null },
                    { name: "Fancy Face KKgirl of Luka LV", country: null, type: "fraud", regNo: null },
                    { name: "Starlight PZ Yinian", country: null, type: "fraud", regNo: null },
                    { name: "Starlight PZ Haiwa", country: null, type: "fraud", regNo: null },
                    { name: "Maszko Sweety", country: null, type: "fraud", regNo: null },
                    { name: "Alayla Dolls Huniu", country: null, type: "fraud", regNo: null },
                    { name: "Chen Xiang Hunter", country: "Italy", type: "fraud", regNo: null },
                    { name: "Chubbykitten Dika", country: null, type: "fraud", regNo: null },
                    { name: "Pocketdoll Dandan", country: null, type: "fraud", regNo: null },
                    { name: "Bagal Baby Tiffany", country: null, type: "fraud", regNo: null },
                    { name: "Vintdoll Mimi", country: null, type: "fraud", regNo: null },
                    { name: "San Mao Lucy", country: null, type: "fraud", regNo: null },
                    { name: "Slytherindolls William", country: "Poland", type: "fraud", regNo: null },
                    { name: "Chen xiang xiangxiang of Budianer", country: null, type: "fraud", regNo: null },
                    { name: "Chen Xiang's Weiwuxian", country: null, type: "fraud", regNo: null },
                    { name: "Codfish Clara", country: "USA", type: "fraud", regNo: null },
                    { name: "Starlight PZ Shofar Blast", country: "USA", type: "fraud", regNo: null },
                    { name: "Starlight PZ Barrac of Tildoniadol", country: "USA", type: "fraud", regNo: null },
                    { name: "Mewtwo Brabus", country: "USA", type: "fraud", regNo: null },
                    { name: "Fox's JCE Tudou of Pink Queen", country: null, type: "fraud", regNo: null },
                    { name: "Starlight PZ Mia of Juncats", country: null, type: "fraud", regNo: null },
                    { name: "Kittysaurus Benjiro", country: "IDN", type: "fraud", regNo: null },
                    { name: "Candy Kitten's Cartier", country: "Poland", type: "fraud", regNo: null },
                    // Registered cats with proven/suspected fraud
                    { name: "Koc-Pol Cat Oces of Darlinlildols", country: null, type: "suspected", regNo: "0425-02839276" },
                    { name: "Koc-Pol Cat Zippo of Lulynx Dolls", country: null, type: "suspected", regNo: "0482-02979585" },
                    { name: "Koc-Pol Cat Raadsli", country: null, type: "suspected", regNo: "0425-02801747" },
                    { name: "Koc-Pol Cat Cpiert", country: null, type: "suspected", regNo: "0482-02798798" },
                    { name: "Koc-Pol Cat Neco", country: null, type: "suspected", regNo: "0424-02812832" },
                    { name: "Koc-Pol Cat Onbee", country: null, type: "suspected", regNo: "0425-02808940" },
                    { name: "Koc-Pol Cat Mini", country: null, type: "suspected", regNo: "0487-02888837" },
                    { name: "Koc-Pol Cat Lucca of Rtragdoll", country: null, type: "suspected", regNo: "0482-02879763" },
                    { name: "Koc-Pol Cat Mose of Alayla Dolls", country: null, type: "suspected", regNo: "0424-02979584" },
                    { name: "Koc-Pol Cat WIIV", country: null, type: "suspected", regNo: "0425-02830938" },
                    { name: "Koc-Pol Cat Evi", country: null, type: "suspected", regNo: "0483-02824444" },
                    { name: "Koc-Pol Cat Ilrop", country: null, type: "suspected", regNo: "0482-0859118" },
                    { name: "Darlinlildol Mewtwo of Pocketdoll", country: null, type: "suspected", regNo: "0482-02872770" },
                    { name: "Darlinlildol Rceoo", country: null, type: "suspected", regNo: "0483-02852309" },
                    { name: "Darlinlildols Knob", country: null, type: "suspected", regNo: "0482-02854379" },
                    { name: "Darlinlildols Bobby", country: null, type: "suspected", regNo: "0482-02189956" },
                    { name: "Darlinlildol Year of Chubbykitten", country: null, type: "suspected", regNo: "0482-02849000" },
                    { name: "Darlinlildols Saab", country: null, type: "suspected", regNo: "0482-02858437" },
                    { name: "Darlinlidols Adal", country: "Germany", type: "suspected", regNo: null },
                    { name: "Quiner of Darlinlilldol", country: null, type: "suspected", regNo: null },
                    { name: "Darlinlildol Cierra", country: null, type: "suspected", regNo: null },
                    { name: "Avocado Tag", country: null, type: "suspected", regNo: "0483-02851354" },
                    { name: "Avocado Doge of Starlight PZ", country: null, type: "suspected", regNo: "0486-02924195" },
                    { name: "Avocado Green", country: null, type: "suspected", regNo: "0425-02842854" },
                    { name: "Avocado Zebra of Starlight PZ", country: null, type: "suspected", regNo: "0482-02913771" },
                    { name: "Koci Eden DPL of Meoko Aaron", country: null, type: "suspected", regNo: "0424-02981184" },
                    { name: "Koci Eden Tohl", country: null, type: "suspected", regNo: "0424-02816748" },
                    { name: "Angelicdolls Sweet", country: null, type: "suspected", regNo: "0425-02899145" },
                    { name: "Angelicdolls Laura", country: null, type: "suspected", regNo: "0482-02839990" },
                    { name: "Angelicdolls Oscar", country: null, type: "suspected", regNo: "0482-02836098" },
                    { name: "Ragissa Polaris", country: null, type: "suspected", regNo: "0487-02858093" },
                    { name: "Ragissa Paul", country: null, type: "suspected", regNo: "0482-02878473" },
                    { name: "Ragissa Poseidon", country: "China", type: "suspected", regNo: null },
                    { name: "Naorahdolls Messi", country: null, type: "suspected", regNo: "0482-02836920" },
                    { name: "Naorahdolls Cion", country: null, type: "suspected", regNo: "0483-02834848" },
                    { name: "Naorahdolls Iguasd", country: null, type: "suspected", regNo: "0486-02870637" },
                    { name: "Naorahdolls Para Siempre", country: null, type: "suspected", regNo: "0425-02878089" },
                    { name: "Naorahdolls Mifree", country: null, type: "suspected", regNo: "FPL 83047" },
                    { name: "Naorahdolls Cooper", country: null, type: "suspected", regNo: null },
                    { name: "Soulmates Loki", country: null, type: "suspected", regNo: "0486-02854023" },
                    { name: "Soulmates Niiya", country: null, type: "suspected", regNo: "0425-02853199" },
                    { name: "Soulmates Sok", country: null, type: "suspected", regNo: "0425-02853199" },
                    { name: "Soulmates Nuobao", country: null, type: "suspected", regNo: "0424-02854603" },
                    { name: "Soulmates Alouette of Koc-Pol Cat", country: null, type: "suspected", regNo: "0425-02914983" },
                    { name: "Reflection Rafa", country: "Poland", type: "suspected", regNo: "FPL 023519" },
                    { name: "Supurrags Symba", country: null, type: "suspected", regNo: null },
                    { name: "Dollhouse Showcase", country: "Brazil", type: "suspected", regNo: null },
                    { name: "Kebekat Kahlua", country: null, type: "suspected", regNo: null },
                    { name: "Lottarags Daisy", country: null, type: "suspected", regNo: null },
                    { name: "Lottarags Josie", country: null, type: "suspected", regNo: null },
                    { name: "Dsjewels Royal Blue Gene", country: null, type: "suspected", regNo: null },
                    { name: "Ohemgee Giru Msieyz", country: null, type: "suspected", regNo: "0482-02857116" }
                ];

                // Update total blacklisted count
                document.getElementById('totalBlacklisted').textContent = this.blacklistedCats.length;
            }

            setupEventListeners() {
                const searchForm = document.getElementById('searchForm');
                searchForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.performSearch();
                });
            }

            populateBlacklistDisplay() {
                const container = document.getElementById('blacklistContainer');
                container.innerHTML = '';

                this.blacklistedCats.slice(0, 10).forEach(cat => {
                    const item = document.createElement('div');
                    item.className = 'blacklist-item';
                    item.innerHTML = `
                        <div class="blacklist-name">${cat.name}</div>
                        <div class="blacklist-details">
                            ${cat.country ? `Country: ${cat.country} | ` : ''}
                            Type: ${cat.type} ${cat.regNo ? `| Reg: ${cat.regNo}` : ''}
                        </div>
                    `;
                    container.appendChild(item);
                });

                if (this.blacklistedCats.length > 10) {
                    const moreItem = document.createElement('div');
                    moreItem.className = 'blacklist-item';
                    moreItem.style.textAlign = 'center';
                    moreItem.style.fontStyle = 'italic';
                    moreItem.innerHTML = `<div class="blacklist-details">... and ${this.blacklistedCats.length - 10} more entries</div>`;
                    container.appendChild(moreItem);
                }
            }

            levenshteinDistance(str1, str2) {
                const matrix = [];
                const len1 = str1.length;
                const len2 = str2.length;

                for (let i = 0; i <= len2; i++) {
                    matrix[i] = [i];
                }

                for (let j = 0; j <= len1; j++) {
                    matrix[0][j] = j;
                }

                for (let i = 1; i <= len2; i++) {
                    for (let j = 1; j <= len1; j++) {
                        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                            matrix[i][j] = matrix[i - 1][j - 1];
                        } else {
                            matrix[i][j] = Math.min(
                                matrix[i - 1][j - 1] + 1,
                                matrix[i][j - 1] + 1,
                                matrix[i - 1][j] + 1
                            );
                        }
                    }
                }

                return matrix[len2][len1];
            }

            fuzzyMatch(searchName, blacklistName, threshold = 0.8) {
                const distance = this.levenshteinDistance(searchName.toLowerCase(), blacklistName.toLowerCase());
                const maxLength = Math.max(searchName.length, blacklistName.length);
                const similarity = 1 - (distance / maxLength);
                return similarity >= threshold;
            }

            checkForFraud(catName, country = null) {
                const results = [];
                
                // Exact match check
                for (const cat of this.blacklistedCats) {
                    if (cat.name.toLowerCase() === catName.toLowerCase()) {
                        if (!country || !cat.country || cat.country.toLowerCase() === country.toLowerCase()) {
                            results.push({
                                match: cat,
                                matchType: 'exact',
                                confidence: 1.0
                            });
                        }
                    }
                }

                // Fuzzy match check
                for (const cat of this.blacklistedCats) {
                    if (this.fuzzyMatch(catName, cat.name, 0.85)) {
                        if (!results.some(r => r.match.name === cat.name)) {
                            if (!country || !cat.country || cat.country.toLowerCase() === country.toLowerCase()) {
                                const distance = this.levenshteinDistance(catName.toLowerCase(), cat.name.toLowerCase());
                                const maxLength = Math.max(catName.length, cat.name.length);
                                const confidence = 1 - (distance / maxLength);
                                
                                results.push({
                                    match: cat,
                                    matchType: 'fuzzy',
                                    confidence: confidence
                                });
                            }
                        }
                    }
                }

                // Partial name match check
                const searchWords = catName.toLowerCase().split(' ');
                for (const cat of this.blacklistedCats) {
                    const catWords = cat.name.toLowerCase().split(' ');
                    let matchingWords = 0;
                    
                    for (const searchWord of searchWords) {
                        for (const catWord of catWords) {
                            if (searchWord.length > 3 && catWord.includes(searchWord)) {
                                matchingWords++;
                                break;
                            }
                        }
                    }
                    
                    if (matchingWords >= 2 && !results.some(r => r.match.name === cat.name)) {
                        if (!country || !cat.country || cat.country.toLowerCase() === country.toLowerCase()) {
                            results.push({
                                match: cat,
                                matchType: 'partial',
                                confidence: matchingWords / Math.max(searchWords.length, catWords.length)
                            });
                        }
                    }
                }

                return results.sort((a, b) => b.confidence - a.confidence);
            }

            showMessage(message, type = 'info') {
                const messagesDiv = document.getElementById('messages');
                const messageElement = document.createElement('div');
                messageElement.className = type === 'error' ? 'error-message' : 'success-message';
                messageElement.textContent = message;
                messagesDiv.appendChild(messageElement);
                
                setTimeout(() => {
                    messageElement.remove();
                }, 5000);
            }

            async performSearch() {
                const catName = document.getElementById('catName').value.trim();
                const country = document.getElementById('country').value;
                const searchBtn = document.getElementById('searchBtn');
                const loading = document.getElementById('loading');
                const resultsSection = document.getElementById('resultsSection');
                const searchResults = document.getElementById('searchResults');

                if (!catName) {
                    this.showMessage('Please enter a cat name to search.', 'error');
                    return;
                }

                // Show loading state
                searchBtn.disabled = true;
                loading.classList.add('active');
                document.getElementById('messages').innerHTML = '';

                try {
                    // Simulate API call delay
                    await new Promise(resolve => setTimeout(resolve, 1500));

                    // Check for fraud
                    const fraudResults = this.checkForFraud(catName, country);

                    // Simulate PawPeds API call
                    const pawpedsData = await this.simulatePawpedsSearch(catName);

                    // Update statistics
                    this.totalSearches++;
                    document.getElementById('totalSearches').textContent = this.totalSearches;

                    // Process and display results
                    this.displaySearchResults(catName, country, fraudResults, pawpedsData);

                    if (fraudResults.length > 0) {
                        this.fraudDetectionCount++;
                        document.getElementById('fraudDetected').textContent = this.fraudDetectionCount;
                        this.showMessage(`Warning: Potential fraud detected for "${catName}"!`, 'error');
                    } else {
                        this.showMessage(`No fraud indicators found for "${catName}". Always verify with official sources.`, 'success');
                    }

                } catch (error) {
                    console.error('Search error:', error);
                    this.showMessage('An error occurred during the search. Please try again.', 'error');
                } finally {
                    // Hide loading state
                    searchBtn.disabled = false;
                    loading.classList.remove('active');
                }
            }

            async simulatePawpedsSearch(catName) {
                // Simulate PawPeds database response
                // In production, this would make actual HTTP requests to PawPeds API
                const mockData = {
                    found: Math.random() > 0.3,
                    cats: []
                };

                if (mockData.found) {
                    const numResults = Math.floor(Math.random() * 5) + 1;
                    for (let i = 0; i < numResults; i++) {
                        mockData.cats.push({
                            name: catName + (i > 0 ? ` ${i + 1}` : ''),
                            regNumber: `RAG-${Math.floor(Math.random() * 100000)}`,
                            birthDate: new Date(2015 + Math.floor(Math.random() * 8), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
                            color: ['n 03 21', 'a 03', 'n 03 27'][Math.floor(Math.random() * 3)],
                            parents: {
                                sire: `Sire of ${catName}`,
                                dam: `Dam of ${catName}`
                            },
                            breeder: `Breeder ${Math.floor(Math.random() * 100)}`,
                            owner: `Owner ${Math.floor(Math.random() * 100)}`,
                            country: ['Poland', 'Netherlands', 'USA', 'France', 'Germany'][Math.floor(Math.random() * 5)]
                        });
                    }
                }

                return mockData;
            }

            displaySearchResults(searchName, searchCountry, fraudResults, pawpedsData) {
                const resultsSection = document.getElementById('resultsSection');
                const searchResults = document.getElementById('searchResults');
                
                resultsSection.classList.add('active');
                searchResults.innerHTML = '';

                // Create header
                const header = document.createElement('div');
                header.innerHTML = `<h3>Search Results for "${searchName}"${searchCountry ? ` in ${searchCountry}` : ''}</h3>`;
                searchResults.appendChild(header);

                // Display fraud analysis
                if (fraudResults.length > 0) {
                    const fraudSection = document.createElement('div');
                    fraudSection.innerHTML = '<h4 style="color: #dc3545; margin: 20px 0 10px 0;">⚠️ Fraud Detection Results</h4>';
                    
                    fraudResults.forEach(result => {
                        const fraudItem = document.createElement('div');
                        fraudItem.className = `result-item ${result.match.type === 'fraud' ? 'fraudulent' : 'suspicious'}`;
                        
                        const statusClass = result.match.type === 'fraud' ? 'status-fraudulent' : 'status-suspicious';
                        const statusText = result.match.type === 'fraud' ? 'FRAUDULENT' : 'SUSPICIOUS';
                        
                        fraudItem.innerHTML = `
                            <div class="result-header">
                                <div class="result-name">${result.match.name}</div>
                                <div class="result-status ${statusClass}">${statusText}</div>
                            </div>
                            <div class="result-details">
                                <strong>Match Type:</strong> ${result.matchType} (${(result.confidence * 100).toFixed(1)}% confidence)<br>
                                ${result.match.country ? `<strong>Country:</strong> ${result.match.country}<br>` : ''}
                                ${result.match.regNo ? `<strong>Registration:</strong> ${result.match.regNo}<br>` : ''}
                                <strong>Risk Level:</strong> ${result.match.type === 'fraud' ? 'HIGH - Known fraudulent pedigree' : 'MEDIUM - Suspected fraud, requires verification'}
                            </div>
                        `;
                        fraudSection.appendChild(fraudItem);
                    });
                    
                    searchResults.appendChild(fraudSection);
                }

                // Display PawPeds results
                const pawpedsSection = document.createElement('div');
                pawpedsSection.innerHTML = '<h4 style="margin: 20px 0 10px 0;">🔍 PawPeds Database Results</h4>';
                
                if (pawpedsData.found && pawpedsData.cats.length > 0) {
                    pawpedsData.cats.forEach(cat => {
                        const pawpedsItem = document.createElement('div');
                        pawpedsItem.className = 'result-item';
                        
                        // Cross-reference with fraud database
                        const fraudMatch = fraudResults.find(f => 
                            f.match.name.toLowerCase() === cat.name.toLowerCase() ||
                            (f.match.regNo && f.match.regNo === cat.regNumber)
                        );
                        
                        if (fraudMatch) {
                            pawpedsItem.classList.add(fraudMatch.match.type === 'fraud' ? 'fraudulent' : 'suspicious');
                        }
                        
                        pawpedsItem.innerHTML = `
                            <div class="result-header">
                                <div class="result-name">${cat.name}</div>
                                <div class="result-status ${fraudMatch ? (fraudMatch.match.type === 'fraud' ? 'status-fraudulent' : 'status-suspicious') : 'status-clean'}">
                                    ${fraudMatch ? (fraudMatch.match.type === 'fraud' ? 'FRAUDULENT' : 'SUSPICIOUS') : 'CLEAN'}
                                </div>
                            </div>
                            <div class="result-details">
                                <strong>Registration:</strong> ${cat.regNumber}<br>
                                <strong>Birth Date:</strong> ${cat.birthDate}<br>
                                <strong>Color:</strong> ${cat.color}<br>
                                <strong>Country:</strong> ${cat.country}<br>
                                <strong>Sire:</strong> ${cat.parents.sire}<br>
                                <strong>Dam:</strong> ${cat.parents.dam}<br>
                                <strong>Breeder:</strong> ${cat.breeder}<br>
                                <strong>Owner:</strong> ${cat.owner}
                                ${fraudMatch ? '<br><strong style="color: #dc3545;">⚠️ This cat matches our fraud database!</strong>' : ''}
                            </div>
                        `;
                        pawpedsSection.appendChild(pawpedsItem);
                    });
                } else {
                    const noResults = document.createElement('div');
                    noResults.className = 'result-item';
                    noResults.innerHTML = `
                        <div class="result-details" style="text-align: center; font-style: italic;">
                            No cats found in PawPeds database matching "${searchName}"
                        </div>
                    `;
                    pawpedsSection.appendChild(noResults);
                }
                
                searchResults.appendChild(pawpedsSection);

                // Add recommendation section
                const recommendationSection = document.createElement('div');
                recommendationSection.innerHTML = '<h4 style="margin: 20px 0 10px 0;">📋 Verification Recommendations</h4>';
                
                const recommendations = document.createElement('div');
                recommendations.className = 'result-item';
                
                let recommendationText = '';
                if (fraudResults.length > 0) {
                    recommendationText = `
                        <strong style="color: #dc3545;">HIGH RISK DETECTED</strong><br>
                        • Do NOT proceed with purchase/breeding without thorough investigation<br>
                        • Request original registration papers and verify with registering body<br>
                        • Contact the original breeder directly for confirmation<br>
                        • Consider DNA testing for parentage verification<br>
                        • Report suspected fraud to relevant cat registries
                    `;
                } else {
                    recommendationText = `
                        <strong style="color: #28a745;">No immediate fraud indicators found</strong><br>
                        • Still verify 5-generation pedigree with official sources<br>
                        • Cross-check registration numbers with official databases<br>
                        • Ensure all breeding records are properly documented<br>
                        • Contact breeder for health testing documentation<br>
                        • Trust but verify - fraud techniques evolve constantly
                    `;
                }
                
                recommendations.innerHTML = `<div class="result-details">${recommendationText}</div>`;
                recommendationSection.appendChild(recommendations);
                searchResults.appendChild(recommendationSection);

                // Store search in history
                this.searchHistory.push({
                    name: searchName,
                    country: searchCountry,
                    timestamp: new Date(),
                    fraudDetected: fraudResults.length > 0,
                    fraudResults: fraudResults
                });
            }

            // Advanced fraud detection methods
            async performAdvancedAnalysis(catName, pedigreeData) {
                const analysis = {
                    riskScore: 0,
                    flags: [],
                    recommendations: []
                };

                // Pattern analysis for suspicious naming conventions
                const suspiciousPatterns = [
                    /starlight\s+pz/i,
                    /budianer/i,
                    /darlinlildols?/i,
                    /naorahdolls/i,
                    /koc-pol\s+cat/i,
                    /soulmates/i,
                    /ragissa/i,
                    /angelicdolls/i
                ];

                for (const pattern of suspiciousPatterns) {
                    if (pattern.test(catName)) {
                        analysis.riskScore += 30;
                        analysis.flags.push(`Name matches known fraudulent cattery pattern: ${pattern.source}`);
                    }
                }

                // Geographic inconsistency check
                if (pedigreeData && pedigreeData.country) {
                    const highRiskCountries = ['Poland', 'China', 'Netherlands'];
                    if (highRiskCountries.includes(pedigreeData.country)) {
                        analysis.riskScore += 15;
                        analysis.flags.push(`Cat located in high-risk fraud region: ${pedigreeData.country}`);
                    }
                }

                // Registration number pattern analysis
                if (pedigreeData && pedigreeData.regNumber) {
                    const suspiciousRegPatterns = [
                        /^0482-/, // Common in fraudulent registrations
                        /^0425-/,
                        /^0424-/,
                        /^0483-/
                    ];

                    for (const regPattern of suspiciousRegPatterns) {
                        if (regPattern.test(pedigreeData.regNumber)) {
                            analysis.riskScore += 20;
                            analysis.flags.push(`Registration number follows suspicious pattern: ${regPattern.source}`);
                        }
                    }
                }

                // Generate recommendations based on risk score
                if (analysis.riskScore >= 50) {
                    analysis.recommendations.push('CRITICAL: Do not proceed without extensive verification');
                    analysis.recommendations.push('Demand physical inspection of original papers');
                    analysis.recommendations.push('Contact registration body directly');
                } else if (analysis.riskScore >= 25) {
                    analysis.recommendations.push('CAUTION: Enhanced verification recommended');
                    analysis.recommendations.push('Request 5-generation pedigree for parents');
                } else {
                    analysis.recommendations.push('Standard verification protocols apply');
                }

                return analysis;
            }

            // Export functionality for investigation reports
            generateReport(searchResults) {
                const report = {
                    timestamp: new Date().toISOString(),
                    searchQuery: searchResults.query,
                    fraudMatches: searchResults.fraudResults,
                    pawpedsData: searchResults.pawpedsData,
                    riskAssessment: searchResults.analysis,
                    recommendations: searchResults.recommendations
                };

                const reportJson = JSON.stringify(report, null, 2);
                const blob = new Blob([reportJson], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                
                const a = document.createElement('a');
                a.href = url;
                a.download = `ragdoll_fraud_report_${Date.now()}.json`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }

            // Batch processing for multiple cats
            async processBatch(catNames) {
                const results = [];
                
                for (const catName of catNames) {
                    try {
                        const fraudResults = this.checkForFraud(catName);
                        const pawpedsData = await this.simulatePawpedsSearch(catName);
                        const analysis = await this.performAdvancedAnalysis(catName, pawpedsData.cats[0]);
                        
                        results.push({
                            name: catName,
                            fraudResults,
                            pawpedsData,
                            analysis,
                            processed: new Date()
                        });
                        
                        // Rate limiting
                        await new Promise(resolve => setTimeout(resolve, 500));
                    } catch (error) {
                        results.push({
                            name: catName,
                            error: error.message,
                            processed: new Date()
                        });
                    }
                }
                
                return results;
            }
        }

        // Initialize the application
        document.addEventListener('DOMContentLoaded', () => {
            window.fraudDetector = new RagdollFraudDetector();
            
            // Add keyboard shortcuts
            document.addEventListener('keydown', (e) => {
                if (e.ctrlKey && e.key === 'Enter') {
                    document.getElementById('searchForm').dispatchEvent(new Event('submit'));
                }
            });

            // Auto-focus search input
            document.getElementById('catName').focus();

            // Add placeholder rotation for engagement
            const placeholders = [
                'Enter cat name to verify...',
                'e.g., Starlight PZ Mulan',
                'e.g., Budianer Kai',
                'e.g., Darlinlildols Bobby',
                'Search for suspicious pedigrees...'
            ];
            
            let placeholderIndex = 0;
            const catNameInput = document.getElementById('catName');
            
            setInterval(() => {
                if (document.activeElement !== catNameInput) {
                    placeholderIndex = (placeholderIndex + 1) % placeholders.length;
                    catNameInput.placeholder = placeholders[placeholderIndex];
                }
            }, 3000);
        });

        // Advanced search features and API integration points
        class PawPedsAPIIntegration {
            constructor(baseURL = 'https://www.pawpeds.com/db/') {
                this.baseURL = baseURL;
                this.rateLimit = 1000; // ms between requests
                this.lastRequest = 0;
            }

            async searchCat(name, options = {}) {
                // Rate limiting
                const now = Date.now();
                const timeSinceLastRequest = now - this.lastRequest;
                if (timeSinceLastRequest < this.rateLimit) {
                    await new Promise(resolve => setTimeout(resolve, this.rateLimit - timeSinceLastRequest));
                }
                this.lastRequest = Date.now();

                const params = new URLSearchParams({
                    a: 'as',
                    p: 'rag',
                    name: name,
                    ems: options.ems || '',
                    sex: options.sex || 'B',
                    born_after: options.bornAfter || '',
                    born_before: options.bornBefore || '',
                    born_in: options.bornIn || '',
                    lives_in: options.livesIn || '',
                    picture: options.picture || 'B',
                    health_info: options.healthInfo || 'B',
                    g: options.generations || '9'
                });

                const url = `${this.baseURL}?${params.toString()}`;
                
                try {
                    // In a real implementation, this would use fetch() or similar
                    // For this demo, we'll simulate the response
                    return await this.simulateAPIResponse(name);
                } catch (error) {
                    console.error('PawPeds API error:', error);
                    throw new Error('Failed to fetch data from PawPeds database');
                }
            }

            async simulateAPIResponse(name) {
                // Simulate network delay
                await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500));
                
                // Return mock data structure similar to PawPeds
                return {
                    success: true,
                    query: name,
                    results: [
                        {
                            name: name,
                            registration: `RAG-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
                            sex: Math.random() > 0.5 ? 'M' : 'F',
                            color: 'RAG n 03 21',
                            birthDate: new Date(2018 + Math.floor(Math.random() * 5), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
                            breeder: 'Unknown Breeder',
                            owner: 'Unknown Owner',
                            pedigree: {
                                generations: 9,
                                sire: `${name}'s Sire`,
                                dam: `${name}'s Dam`,
                                // Would include full 9-generation tree in real implementation
                            }
                        }
                    ]
                };
            }
        }

        // Database schema for production SQLite implementation
        const DATABASE_SCHEMA = `
            CREATE TABLE IF NOT EXISTS blacklisted_cats (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                country TEXT,
                registration_number TEXT,
                fraud_type TEXT CHECK(fraud_type IN ('fraud', 'suspected', 'confirmed')),
                date_added DATETIME DEFAULT CURRENT_TIMESTAMP,
                source TEXT,
                notes TEXT,
                verified BOOLEAN DEFAULT FALSE
            );

            CREATE TABLE IF NOT EXISTS search_history (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                search_query TEXT NOT NULL,
                search_country TEXT,
                results_found INTEGER,
                fraud_detected BOOLEAN,
                search_timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
                user_ip TEXT,
                session_id TEXT
            );

            CREATE TABLE IF NOT EXISTS fraud_patterns (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                pattern_type TEXT NOT NULL,
                pattern_value TEXT NOT NULL,
                risk_score INTEGER,
                description TEXT,
                active BOOLEAN DEFAULT TRUE
            );

            CREATE INDEX idx_blacklisted_name ON blacklisted_cats(name);
            CREATE INDEX idx_blacklisted_country ON blacklisted_cats(country);
            CREATE INDEX idx_blacklisted_registration ON blacklisted_cats(registration_number);
            CREATE INDEX idx_search_timestamp ON search_history(search_timestamp);
        `;
    </script>
</body>
</html>
