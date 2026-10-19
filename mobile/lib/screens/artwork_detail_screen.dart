import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../models/artwork.dart';
import '../services/audio_manager.dart';
import '../theme/app_theme.dart';
import '../widgets/art_image.dart';
import 'commission_screen.dart';

class ArtworkDetailScreen extends StatefulWidget {
  final Artwork artwork;

  const ArtworkDetailScreen({super.key, required this.artwork});

  @override
  State<ArtworkDetailScreen> createState() => _ArtworkDetailScreenState();
}

class _ArtworkDetailScreenState extends State<ArtworkDetailScreen> {
  final AudioManager _audioManager = AudioManager();

  String _formatDuration(Duration d) {
    String twoDigits(int n) => n.toString().padLeft(2, '0');
    final minutes = twoDigits(d.inMinutes.remainder(60));
    final seconds = twoDigits(d.inSeconds.remainder(60));
    return '$minutes:$seconds';
  }

  @override
  Widget build(BuildContext context) {
    final artwork = widget.artwork;

    return Scaffold(
      backgroundColor: AppTheme.surface,
      appBar: AppBar(
        title: Text(artwork.title.toUpperCase()),
        actions: [
          IconButton(
            icon: const Icon(Icons.share_outlined, size: 20),
            onPressed: () {
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(
                  content: Text('Sharing "${artwork.title}"'),
                  duration: const Duration(seconds: 1),
                ),
              );
            },
          ),
        ],
      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Image with interactive viewer
            AspectRatio(
              aspectRatio: 1.0,
              child: Container(
                color: Colors.black12,
                child: InteractiveViewer(
                  maxScale: 3.5,
                  child: ArtImage(
                    imagePath: artwork.imageUrl,
                    fit: BoxFit.cover,
                  ),
                ),
              ),
            ),

            Padding(
              padding: const EdgeInsets.all(24.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Category tag
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                    decoration: BoxDecoration(
                      border: Border.all(color: AppTheme.borderLight),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Text(
                      artwork.category.toUpperCase(),
                      style: GoogleFonts.inter(
                        fontSize: 10,
                        fontWeight: FontWeight.w600,
                        letterSpacing: 1.5,
                        color: AppTheme.textMuted,
                      ),
                    ),
                  ),
                  const SizedBox(height: 12),

                  // Title
                  Text(
                    artwork.title,
                    style: GoogleFonts.playfairDisplay(
                      fontSize: 32,
                      fontWeight: FontWeight.bold,
                      color: AppTheme.textDark,
                    ),
                  ),
                  const SizedBox(height: 8),

                  // Medium & Year
                  Text(
                    '${artwork.medium} • ${artwork.year}',
                    style: GoogleFonts.inter(
                      fontSize: 14,
                      color: AppTheme.textMuted,
                      letterSpacing: 0.5,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    'Dimensions: ${artwork.dimensions}',
                    style: GoogleFonts.inter(
                      fontSize: 12,
                      color: AppTheme.textMuted,
                    ),
                  ),
                  const SizedBox(height: 24),

                  // AUDIO COMMENTARY / AUDIO GUIDE PLAYER
                  AnimatedBuilder(
                    animation: _audioManager,
                    builder: (context, _) {
                      final isCurrentTrack =
                          _audioManager.currentArtwork?.id == artwork.id;
                      final isPlaying =
                          isCurrentTrack && _audioManager.isGuidePlaying;
                      final position = isCurrentTrack
                          ? _audioManager.currentPosition
                          : Duration.zero;
                      final total = isCurrentTrack
                          ? _audioManager.totalDuration
                          : Duration.zero;

                      return Container(
                        padding: const EdgeInsets.all(18),
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(16),
                          border: Border.all(
                            color: isPlaying
                                ? AppTheme.primary
                                : AppTheme.borderLight,
                            width: isPlaying ? 1.5 : 1.0,
                          ),
                          boxShadow: [
                            BoxShadow(
                              color: Colors.black.withValues(alpha: 0.03),
                              blurRadius: 10,
                              offset: const Offset(0, 4),
                            ),
                          ],
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Row(
                              children: [
                                Container(
                                  padding: const EdgeInsets.all(8),
                                  decoration: BoxDecoration(
                                    color: isPlaying
                                        ? AppTheme.primary
                                        : AppTheme.surface,
                                    shape: BoxShape.circle,
                                  ),
                                  child: Icon(
                                    Icons.headphones,
                                    size: 16,
                                    color: isPlaying
                                        ? Colors.white
                                        : AppTheme.primary,
                                  ),
                                ),
                                const SizedBox(width: 12),
                                Expanded(
                                  child: Column(
                                    crossAxisAlignment:
                                        CrossAxisAlignment.start,
                                    children: [
                                      Text(
                                        'AUDIO GUIDE & COMMENTARY',
                                        style: GoogleFonts.inter(
                                          fontSize: 9,
                                          fontWeight: FontWeight.bold,
                                          letterSpacing: 1.5,
                                          color: AppTheme.textMuted,
                                        ),
                                      ),
                                      Text(
                                        artwork.audioTitle,
                                        style: GoogleFonts.inter(
                                          fontSize: 13,
                                          fontWeight: FontWeight.w600,
                                          color: AppTheme.textDark,
                                        ),
                                        maxLines: 1,
                                        overflow: TextOverflow.ellipsis,
                                      ),
                                    ],
                                  ),
                                ),
                                IconButton(
                                  icon: Icon(
                                    isPlaying
                                        ? Icons.pause_circle_filled
                                        : Icons.play_circle_filled,
                                    size: 38,
                                    color: AppTheme.primary,
                                  ),
                                  onPressed: () {
                                    _audioManager.playArtworkGuide(artwork);
                                  },
                                ),
                              ],
                            ),
                            if (isCurrentTrack && total.inSeconds > 0) ...[
                              const SizedBox(height: 8),
                              SliderTheme(
                                data: SliderTheme.of(context).copyWith(
                                  thumbShape: const RoundSliderThumbShape(
                                      enabledThumbRadius: 6),
                                  trackHeight: 3,
                                  activeTrackColor: AppTheme.primary,
                                  inactiveTrackColor: AppTheme.borderLight,
                                  thumbColor: AppTheme.primary,
                                ),
                                child: Slider(
                                  value: position.inSeconds
                                      .clamp(0, total.inSeconds)
                                      .toDouble(),
                                  max: total.inSeconds.toDouble(),
                                  onChanged: (val) {
                                    _audioManager
                                        .seekGuide(Duration(seconds: val.toInt()));
                                  },
                                ),
                              ),
                              Padding(
                                padding: const EdgeInsets.symmetric(horizontal: 8),
                                child: Row(
                                  mainAxisAlignment:
                                      MainAxisAlignment.spaceBetween,
                                  children: [
                                    Text(
                                      _formatDuration(position),
                                      style: GoogleFonts.inter(
                                          fontSize: 10,
                                          color: AppTheme.textMuted),
                                    ),
                                    Text(
                                      _formatDuration(total),
                                      style: GoogleFonts.inter(
                                          fontSize: 10,
                                          color: AppTheme.textMuted),
                                    ),
                                  ],
                                ),
                              ),
                            ] else ...[
                              const SizedBox(height: 6),
                              Row(
                                children: [
                                  const SizedBox(width: 44),
                                  Text(
                                    'Duration: ${artwork.audioDuration} • Tap play to listen to artist perspective',
                                    style: GoogleFonts.inter(
                                      fontSize: 11,
                                      color: AppTheme.textMuted,
                                    ),
                                  ),
                                ],
                              ),
                            ],
                          ],
                        ),
                      );
                    },
                  ),
                  const SizedBox(height: 28),

                  // Divider
                  const Divider(color: AppTheme.borderLight),
                  const SizedBox(height: 20),

                  // Description Title
                  Text(
                    'ABOUT THIS ARTWORK',
                    style: GoogleFonts.inter(
                      fontSize: 11,
                      fontWeight: FontWeight.bold,
                      letterSpacing: 1.5,
                      color: AppTheme.textMuted,
                    ),
                  ),
                  const SizedBox(height: 10),
                  Text(
                    artwork.description,
                    style: GoogleFonts.inter(
                      fontSize: 15,
                      color: AppTheme.textDark,
                      height: 1.7,
                    ),
                  ),
                  const SizedBox(height: 36),

                  // Inquire / Commission Button
                  SizedBox(
                    width: double.infinity,
                    height: 54,
                    child: ElevatedButton(
                      style: ElevatedButton.styleFrom(
                        backgroundColor: AppTheme.primary,
                        foregroundColor: Colors.white,
                        shape: RoundedRectangle64(),
                        elevation: 0,
                      ),
                      onPressed: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => CommissionScreen(
                              initialArtwork: artwork,
                            ),
                          ),
                        );
                      },
                      child: Text(
                        'INQUIRE ABOUT THIS ARTWORK',
                        style: GoogleFonts.inter(
                          fontSize: 12,
                          fontWeight: FontWeight.bold,
                          letterSpacing: 1.5,
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(height: 40),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class RoundedRectangle64 extends RoundedRectangleBorder {
  RoundedRectangle64() : super(borderRadius: BorderRadius.circular(28));
}
