import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-bible-primary to-bible-secondary rounded-lg flex items-center justify-center">
              <i className="fas fa-book-open text-white"></i>
            </div>
            <h1 className="text-2xl font-bold gradient-text">BibleApp</h1>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-bible-primary to-bible-secondary rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg">
            <i className="fas fa-book-open text-white text-2xl"></i>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Your Digital Bible
            <span className="block gradient-text">Companion</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Read, study, and grow in your faith with our comprehensive Bible app. 
            Access multiple translations, daily verses, prayer tools, and study resources.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              size="lg" 
              className="bg-bible-primary hover:bg-bible-primary/90 text-white px-8 py-4 text-lg font-medium"
              onClick={() => window.location.href = '/api/login'}
              data-testid="button-login"
            >
              <i className="fas fa-sign-in-alt mr-2"></i>
              Get Started
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-bible-primary text-bible-primary hover:bg-bible-primary hover:text-white px-8 py-4 text-lg font-medium"
            >
              <i className="fas fa-play-circle mr-2"></i>
              Watch Demo
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-book text-white text-xl"></i>
                </div>
                <h3 className="text-xl font-semibold mb-4">Multiple Translations</h3>
                <p className="text-muted-foreground">
                  Access ESV, NIV, and Tagalog translations with side-by-side comparison
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-highlight text-white text-xl"></i>
                </div>
                <h3 className="text-xl font-semibold mb-4">Study Tools</h3>
                <p className="text-muted-foreground">
                  Highlight verses, take notes, and bookmark your favorite passages
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-praying-hands text-white text-xl"></i>
                </div>
                <h3 className="text-xl font-semibold mb-4">Prayer & Devotion</h3>
                <p className="text-muted-foreground">
                  Daily verses, prayer requests, and spiritual growth tracking
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Additional Features */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="text-left">
              <h2 className="text-3xl font-bold mb-6">Everything you need for Bible study</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-bible-primary rounded-full flex items-center justify-center">
                    <i className="fas fa-check text-white text-xs"></i>
                  </div>
                  <span className="text-muted-foreground">Offline reading capabilities</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-bible-primary rounded-full flex items-center justify-center">
                    <i className="fas fa-check text-white text-xs"></i>
                  </div>
                  <span className="text-muted-foreground">Cross-reference and concordance</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-bible-primary rounded-full flex items-center justify-center">
                    <i className="fas fa-check text-white text-xs"></i>
                  </div>
                  <span className="text-muted-foreground">Reading plans and progress tracking</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-bible-primary rounded-full flex items-center justify-center">
                    <i className="fas fa-check text-white text-xs"></i>
                  </div>
                  <span className="text-muted-foreground">Community features and sharing</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-bible-primary/10 to-bible-secondary/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4">Available Everywhere</h3>
              <p className="text-muted-foreground mb-6">
                Install as a Progressive Web App on any device. Works on phones, tablets, and desktop computers.
              </p>
              <div className="flex items-center space-x-4">
                <i className="fas fa-mobile-alt text-2xl text-bible-primary"></i>
                <i className="fas fa-tablet-alt text-2xl text-bible-primary"></i>
                <i className="fas fa-laptop text-2xl text-bible-primary"></i>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <Card className="bg-gradient-to-r from-bible-primary to-bible-secondary border-0">
            <CardContent className="p-12 text-center text-white">
              <h2 className="text-3xl font-bold mb-4">Ready to start your Bible journey?</h2>
              <p className="text-xl mb-8 opacity-90">
                Join thousands of users who are growing in their faith with BibleApp
              </p>
              <Button 
                size="lg" 
                variant="secondary"
                className="bg-white text-bible-primary hover:bg-gray-100 px-8 py-4 text-lg font-medium"
                onClick={() => window.location.href = '/api/login'}
                data-testid="button-login-cta"
              >
                Start Reading Today
                <i className="fas fa-arrow-right ml-2"></i>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-border">
        <div className="text-center text-muted-foreground">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-6 h-6 bg-gradient-to-br from-bible-primary to-bible-secondary rounded flex items-center justify-center">
              <i className="fas fa-book-open text-white text-xs"></i>
            </div>
            <span className="font-medium">BibleApp</span>
          </div>
          <p>&copy; 2025 BibleApp. Built for spiritual growth and community.</p>
        </div>
      </footer>
    </div>
  );
}
