import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../services/audio_manager.dart';
import '../theme/app_theme.dart';
import '../widgets/art_image.dart';
import 'artist_screen.dart';
import 'artwork_detail_screen.dart';
import 'commission_screen.dart';
import 'gallery_screen.dart';
import 'home_screen.dart';

class MainNavigationScreen extends StatefulWidget {
  const MainNavigationScreen({super.key});

  @override
  State<MainNavigationScreen> createState() => _MainNavigationScreenState();
}

class _MainNavigationScreenState extends State<MainNavigationScreen> {
  int _currentIndex = 0;
  final AudioManager _audioManager = AudioManager();

  void _navigateToIndex(int index) {
    setState(() => _currentIndex = index);
  }

  String _getScreenTitle(int index) {
    switch (index) {
      case 0:
        return 'Home — Master Collection';
      case 1:
        return 'Gallery — All Artworks';
      case 2:
        return 'The Artist — Arifur Jaman';
      case 3:
        return 'Commission & Contact';
      default:
        return 'Arifur Portfolio';
    }
  }

  @override
  Widget build(BuildContext context) {
    final List<Widget> screens = [
      HomeScreen(
        onNavigateToGallery: () => _navigateToIndex(1),
        onNavigateToCommission: () => _navigateToIndex(3),
      ),
      const GalleryScreen(),
      const ArtistScreen(),
      const CommissionScreen(),
    ];

    // Non-exit infinite loop mode requested by user:
    // "আর এই সাইট থেকে ব্যাক করে বের হয়ে যাওয়া যাবে না চ্যাঞ্জ হতে থাকবে এটি অ্যাপ এর উপর প্রয়োগ করো"
    return PopScope(
      canPop: false,
      onPopInvokedWithResult: (didPop, result) {
        if (didPop) return;
        setState(() {
          _currentIndex = (_currentIndex + 1) % screens.length;
        });
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Row(
              children: [
                const Icon(Icons.loop, color: Colors.white, size: 18),
                const SizedBox(width: 10),
                Expanded(
                  child: Text(
                    'Loop Active: Switched to ${_getScreenTitle(_currentIndex)}',
                    style: GoogleFonts.inter(fontSize: 12, fontWeight: FontWeight.w600),
                  ),
                ),
              ],
            ),
            duration: const Duration(seconds: 1),
            behavior: SnackBarBehavior.floating,
            backgroundColor: AppTheme.primary,
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
          ),
        );
      },
      child: Scaffold(
        body: screens[_currentIndex],
      bottomNavigationBar: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          // Persistent Floating Mini Audio Player when guide is active
          AnimatedBuilder(
            animation: _audioManager,
            builder: (context, _) {
              final current = _audioManager.currentArtwork;
              if (current == null) return const SizedBox.shrink();

              final isPlaying = _audioManager.isGuidePlaying;

              return Container(
                margin: const EdgeInsets.fromLTRB(16, 0, 16, 8),
                padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                decoration: BoxDecoration(
                  color: AppTheme.primary,
                  borderRadius: BorderRadius.circular(16),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withValues(alpha: 0.2),
                      blurRadius: 12,
                      offset: const Offset(0, 4),
                    ),
                  ],
                ),
                child: Row(
                  children: [
                    ArtImage(
                      imagePath: current.imageUrl,
                      width: 42,
                      height: 42,
                      fit: BoxFit.cover,
                      borderRadius: BorderRadius.circular(8),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: GestureDetector(
                        onTap: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (context) =>
                                  ArtworkDetailScreen(artwork: current),
                            ),
                          );
                        },
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Text(
                              'AUDIO GUIDE PLAYING',
                              style: GoogleFonts.inter(
                                fontSize: 8,
                                fontWeight: FontWeight.bold,
                                letterSpacing: 1.5,
                                color: Colors.white70,
                              ),
                            ),
                            Text(
                              current.title,
                              style: GoogleFonts.inter(
                                fontSize: 13,
                                fontWeight: FontWeight.w600,
                                color: Colors.white,
                              ),
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
                            ),
                          ],
                        ),
                      ),
                    ),
                    IconButton(
                      icon: Icon(
                        isPlaying ? Icons.pause : Icons.play_arrow,
                        color: Colors.white,
                      ),
                      onPressed: () {
                        if (isPlaying) {
                          _audioManager.pauseGuide();
                        } else {
                          _audioManager.resumeGuide();
                        }
                      },
                    ),
                    IconButton(
                      icon: const Icon(Icons.close, color: Colors.white70, size: 20),
                      onPressed: () {
                        _audioManager.stopGuide();
                      },
                    ),
                  ],
                ),
              );
            },
          ),

          // Bottom navigation bar
          Container(
            decoration: const BoxDecoration(
              color: Colors.white,
              border: Border(top: BorderSide(color: AppTheme.borderLight)),
            ),
            child: BottomNavigationBar(
              currentIndex: _currentIndex,
              onTap: _navigateToIndex,
              backgroundColor: Colors.white,
              selectedItemColor: AppTheme.primary,
              unselectedItemColor: AppTheme.textMuted,
              selectedFontSize: 11,
              unselectedFontSize: 11,
              type: BottomNavigationBarType.fixed,
              elevation: 0,
              items: const [
                BottomNavigationBarItem(
                  icon: Icon(Icons.home_outlined),
                  activeIcon: Icon(Icons.home),
                  label: 'Home',
                ),
                BottomNavigationBarItem(
                  icon: Icon(Icons.photo_library_outlined),
                  activeIcon: Icon(Icons.photo_library),
                  label: 'Gallery',
                ),
                BottomNavigationBarItem(
                  icon: Icon(Icons.person_outline),
                  activeIcon: Icon(Icons.person),
                  label: 'Artist',
                ),
                BottomNavigationBarItem(
                  icon: Icon(Icons.edit_note_outlined),
                  activeIcon: Icon(Icons.edit_note),
                  label: 'Commission',
                ),
              ],
            ),
          ),
        ],
      ),
    ),
  );
}
}
