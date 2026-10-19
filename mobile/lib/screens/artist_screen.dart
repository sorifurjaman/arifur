import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../theme/app_theme.dart';
import '../widgets/art_image.dart';
import 'commission_screen.dart';

class ArtistScreen extends StatelessWidget {
  const ArtistScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.surface,
      appBar: AppBar(
        title: const Text('THE FOUNDER & ARTIST'),
      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // OWNER LUXURY BANNER WITH 20251203_160322.jpg
            Stack(
              children: [
                Container(
                  height: 420,
                  width: double.infinity,
                  color: Colors.black,
                  child: const ArtImage(
                    imagePath: 'assets/images/owner.jpg',
                    fit: BoxFit.cover,
                  ),
                ),
                Positioned.fill(
                  child: Container(
                    decoration: BoxDecoration(
                      gradient: LinearGradient(
                        begin: Alignment.topCenter,
                        end: Alignment.bottomCenter,
                        colors: [
                          Colors.transparent,
                          Colors.black.withValues(alpha: 0.4),
                          Colors.black.withValues(alpha: 0.95),
                        ],
                        stops: const [0.0, 0.5, 1.0],
                      ),
                    ),
                  ),
                ),
                Positioned(
                  top: 16,
                  right: 16,
                  child: Container(
                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                    decoration: BoxDecoration(
                      color: const Color(0xFFD4AF37),
                      borderRadius: BorderRadius.circular(20),
                      boxShadow: [
                        BoxShadow(
                          color: const Color(0xFFD4AF37).withValues(alpha: 0.4),
                          blurRadius: 10,
                          offset: const Offset(0, 3),
                        ),
                      ],
                    ),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        const Icon(Icons.verified, size: 14, color: Colors.black),
                        const SizedBox(width: 4),
                        Text(
                          '2025 MASTER ARCHITECT',
                          style: GoogleFonts.inter(
                            fontSize: 9,
                            fontWeight: FontWeight.w800,
                            letterSpacing: 1.5,
                            color: Colors.black,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
                Positioned(
                  bottom: 24,
                  left: 24,
                  right: 24,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                        decoration: BoxDecoration(
                          color: Colors.white.withValues(alpha: 0.15),
                          borderRadius: BorderRadius.circular(12),
                          border: Border.all(color: Colors.white24),
                        ),
                        child: Text(
                          'FOUNDER • ARIFUR HACKWORLD',
                          style: GoogleFonts.inter(
                            fontSize: 10,
                            fontWeight: FontWeight.w700,
                            letterSpacing: 2.0,
                            color: const Color(0xFFFFDF73),
                          ),
                        ),
                      ),
                      const SizedBox(height: 8),
                      Text(
                        'Arifur Jaman',
                        style: GoogleFonts.playfairDisplay(
                          fontSize: 34,
                          fontWeight: FontWeight.bold,
                          color: Colors.white,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        'Technologist, Autonomous System Developer & Contemporary Visual Creator',
                        style: GoogleFonts.inter(
                          fontSize: 12,
                          color: Colors.white70,
                          height: 1.4,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),

            Padding(
              padding: const EdgeInsets.all(24.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Biography
                  Text(
                    'CREATIVE PHILOSOPHY & VISION',
                    style: GoogleFonts.inter(
                      fontSize: 11,
                      fontWeight: FontWeight.bold,
                      letterSpacing: 1.5,
                      color: AppTheme.textMuted,
                    ),
                  ),
                  const SizedBox(height: 12),
                  Text(
                    'Welcome to the official creative portal of Arifur Jaman. By merging the discipline of software engineering with the expressive depth of contemporary art, my work represents a dialogue between human emotion and digital precision.\n\nFrom building high-speed automated bots and web architectures to designing tactile and visual aesthetics, every project embodies a relentless pursuit of innovation, functionality, and timeless style.',
                    style: GoogleFonts.inter(
                      fontSize: 14,
                      color: AppTheme.textDark,
                      height: 1.7,
                    ),
                  ),
                  const SizedBox(height: 28),

                  // Milestones stats grid
                  Container(
                    padding: const EdgeInsets.all(20),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(16),
                      border: Border.all(color: AppTheme.borderLight),
                    ),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceAround,
                      children: [
                        _buildStat('10+', 'Bots & Tools'),
                        _buildDivider(),
                        _buildStat('50K+', 'Community'),
                        _buildDivider(),
                        _buildStat('100%', 'Bespoke'),
                        _buildDivider(),
                        _buildStat('2025', 'Edition'),
                      ],
                    ),
                  ),
                  const SizedBox(height: 36),

                  // Ecosystem Showcase
                  Text(
                    'ARIFUR HACKWORLD ECOSYSTEM',
                    style: GoogleFonts.inter(
                      fontSize: 11,
                      fontWeight: FontWeight.bold,
                      letterSpacing: 1.5,
                      color: AppTheme.textMuted,
                    ),
                  ),
                  const SizedBox(height: 16),
                  _buildEcosystemCard(
                    context,
                    icon: Icons.smart_toy_outlined,
                    title: 'Telegram Autonomous Bots',
                    subtitle: 'Ariferex Bot, Group Chowkidar, Link Destroyer, TeraVideo, My Data Store, ArifurAI',
                    badge: 'Automated Suite',
                  ),
                  const SizedBox(height: 12),
                  _buildEcosystemCard(
                    context,
                    icon: Icons.language_outlined,
                    title: 'Web Platforms & Services',
                    subtitle: 'DevStore, Arifur Live TV, Base64 Pro Converter, Voice Generator, Cloud Tools',
                    badge: 'Web 3.0',
                  ),
                  const SizedBox(height: 12),
                  _buildEcosystemCard(
                    context,
                    icon: Icons.phone_android_outlined,
                    title: 'Mobile Utilities & Apps',
                    subtitle: 'AmarTube, SnapStream Downloader, Code Editor Pro, Mayaboti AI, TV Free',
                    badge: 'Mobile Apps',
                  ),
                  const SizedBox(height: 12),
                  _buildEcosystemCard(
                    context,
                    icon: Icons.palette_outlined,
                    title: 'Digital Fine Art & Photography',
                    subtitle: 'Curated 2025 Master Portfolio with bespoke soundscapes and ambient commentary',
                    badge: 'Fine Art',
                  ),
                  const SizedBox(height: 36),

                  // Community & Connect
                  Text(
                    'COMMUNITY & OFFICIAL CHANNELS',
                    style: GoogleFonts.inter(
                      fontSize: 11,
                      fontWeight: FontWeight.bold,
                      letterSpacing: 1.5,
                      color: AppTheme.textMuted,
                    ),
                  ),
                  _buildSocialTile(context, Icons.send, 'Telegram Community', 't.me/ArifurHackworld'),
                  _buildSocialTile(context, Icons.campaign, 'Telegram Official Channel', 't.me/ArifurHack'),
                  _buildSocialTile(context, Icons.facebook, 'Facebook Profile', 'facebook.com/fary.pol'),
                  _buildSocialTile(context, Icons.code, 'GitHub Repository', 'github.com/biplobc384-dotcom'),
                  _buildSocialTile(context, Icons.chat_bubble_outline, 'Discord Server', 'discord.gg/jqFHknCmN'),
                  const SizedBox(height: 32),

                  // Commission / Contact Button
                  SizedBox(
                    width: double.infinity,
                    height: 52,
                    child: ElevatedButton(
                      style: ElevatedButton.styleFrom(
                        backgroundColor: AppTheme.primary,
                        foregroundColor: Colors.white,
                        shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(26)),
                        elevation: 0,
                      ),
                      onPressed: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => const CommissionScreen(),
                          ),
                        );
                      },
                      child: Text(
                        'COMMISSION OR CONTACT ARIFUR',
                        style: GoogleFonts.inter(
                          fontSize: 12,
                          fontWeight: FontWeight.bold,
                          letterSpacing: 1.5,
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(height: 32),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildStat(String number, String label) {
    return Column(
      children: [
        Text(
          number,
          style: GoogleFonts.playfairDisplay(
            fontSize: 20,
            fontWeight: FontWeight.bold,
            color: AppTheme.textDark,
          ),
        ),
        const SizedBox(height: 4),
        Text(
          label.toUpperCase(),
          style: GoogleFonts.inter(
            fontSize: 9,
            fontWeight: FontWeight.w600,
            letterSpacing: 0.8,
            color: AppTheme.textMuted,
          ),
        ),
      ],
    );
  }

  Widget _buildDivider() {
    return Container(
      width: 1,
      height: 28,
      color: AppTheme.borderLight,
    );
  }

  Widget _buildEcosystemCard(BuildContext context, {
    required IconData icon,
    required String title,
    required String subtitle,
    required String badge,
  }) {
    return Material(
      color: Colors.white,
      borderRadius: BorderRadius.circular(14),
      child: InkWell(
        borderRadius: BorderRadius.circular(14),
        onTap: () {
          showDialog(
            context: context,
            builder: (ctx) => AlertDialog(
              backgroundColor: Colors.white,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(18)),
              title: Row(
                children: [
                  Icon(icon, color: AppTheme.primary, size: 22),
                  const SizedBox(width: 10),
                  Expanded(
                    child: Text(
                      title,
                      style: GoogleFonts.playfairDisplay(
                        fontWeight: FontWeight.bold,
                        fontSize: 18,
                      ),
                    ),
                  ),
                ],
              ),
              content: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                    decoration: BoxDecoration(
                      color: const Color(0xFFD4AF37).withValues(alpha: 0.15),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Text(
                      badge,
                      style: GoogleFonts.inter(fontSize: 10, fontWeight: FontWeight.bold, color: const Color(0xFF8B7500)),
                    ),
                  ),
                  const SizedBox(height: 12),
                  Text(
                    subtitle,
                    style: GoogleFonts.inter(fontSize: 13, height: 1.5, color: AppTheme.textDark),
                  ),
                ],
              ),
              actions: [
                TextButton(
                  onPressed: () => Navigator.pop(ctx),
                  child: const Text('CLOSE'),
                ),
              ],
            ),
          );
        },
        child: Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(14),
            border: Border.all(color: AppTheme.borderLight),
          ),
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                padding: const EdgeInsets.all(10),
                decoration: BoxDecoration(
                  color: AppTheme.surface,
                  borderRadius: BorderRadius.circular(10),
                ),
            child: Icon(icon, color: AppTheme.primary, size: 22),
          ),
          const SizedBox(width: 14),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      title,
                      style: GoogleFonts.playfairDisplay(
                        fontSize: 15,
                        fontWeight: FontWeight.bold,
                        color: AppTheme.textDark,
                      ),
                    ),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                      decoration: BoxDecoration(
                        color: const Color(0xFFD4AF37).withValues(alpha: 0.15),
                        borderRadius: BorderRadius.circular(6),
                      ),
                      child: Text(
                        badge,
                        style: GoogleFonts.inter(
                          fontSize: 9,
                          fontWeight: FontWeight.w700,
                          color: const Color(0xFF8B7500),
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 4),
                Text(
                  subtitle,
                  style: GoogleFonts.inter(
                    fontSize: 12,
                    color: AppTheme.textMuted,
                    height: 1.4,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    ),
  ),
);
  }

  Widget _buildSocialTile(BuildContext context, IconData icon, String title, String handle) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 10.0),
      child: Material(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        child: InkWell(
          borderRadius: BorderRadius.circular(12),
          onTap: () {
            ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(
                content: Text('Opening $title ($handle)'),
                duration: const Duration(seconds: 2),
                backgroundColor: AppTheme.primary,
                behavior: SnackBarBehavior.floating,
              ),
            );
          },
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: AppTheme.borderLight),
            ),
            child: Row(
              children: [
                Icon(icon, size: 18, color: AppTheme.textMuted),
                const SizedBox(width: 12),
                Expanded(
                  child: Text(
                    title,
                    style: GoogleFonts.inter(
                      fontSize: 13,
                      fontWeight: FontWeight.w600,
                      color: AppTheme.textDark,
                    ),
                  ),
                ),
                Text(
                  handle,
                  style: GoogleFonts.inter(
                    fontSize: 11,
                    color: AppTheme.primary,
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
