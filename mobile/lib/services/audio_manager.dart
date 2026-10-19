import 'package:audioplayers/audioplayers.dart';
import 'package:flutter/foundation.dart';
import '../data/artworks_data.dart';
import '../models/artwork.dart';

class AudioManager extends ChangeNotifier {
  static final AudioManager _instance = AudioManager._internal();
  factory AudioManager() => _instance;

  AudioManager._internal() {
    _initAudio();
  }

  final AudioPlayer _ambientPlayer = AudioPlayer();
  final AudioPlayer _guidePlayer = AudioPlayer();

  bool _isAmbientPlaying = false;
  bool get isAmbientPlaying => _isAmbientPlaying;

  Artwork? _currentArtwork;
  Artwork? get currentArtwork => _currentArtwork;

  PlayerState _guideState = PlayerState.stopped;
  PlayerState get guideState => _guideState;
  bool get isGuidePlaying => _guideState == PlayerState.playing;

  Duration _currentPosition = Duration.zero;
  Duration get currentPosition => _currentPosition;

  Duration _totalDuration = Duration.zero;
  Duration get totalDuration => _totalDuration;

  void _initAudio() {
    try {
      AudioPlayer.global.setAudioContext(
        AudioContext(
          android: const AudioContextAndroid(
            isSpeakerphoneOn: true,
            stayAwake: true,
            contentType: AndroidContentType.music,
            usageType: AndroidUsageType.media,
            audioFocus: AndroidAudioFocus.gain,
          ),
          iOS: AudioContextIOS(
            category: AVAudioSessionCategory.playback,
            options: const {
              AVAudioSessionOptions.defaultToSpeaker,
              AVAudioSessionOptions.mixWithOthers,
            },
          ),
        ),
      );
    } catch (e) {
      debugPrint('Audio context config: $e');
    }

    _ambientPlayer.setVolume(1.0);

    _ambientPlayer.onPlayerStateChanged.listen((state) {
      _isAmbientPlaying = (state == PlayerState.playing);
      notifyListeners();
    });

    _guidePlayer.onPlayerStateChanged.listen((state) {
      _guideState = state;
      notifyListeners();
    });

    _guidePlayer.onPositionChanged.listen((pos) {
      _currentPosition = pos;
      notifyListeners();
    });

    _guidePlayer.onDurationChanged.listen((dur) {
      _totalDuration = dur;
      notifyListeners();
    });
  }

  Source _getSource(String path) {
    if (path.startsWith('assets/')) {
      return AssetSource(path.replaceFirst('assets/', ''));
    }
    return UrlSource(path);
  }

  // Play ambient background music
  Future<void> playAmbientMusic() async {
    try {
      await _ambientPlayer.setVolume(1.0);
      try {
        await _ambientPlayer.play(_getSource(ArtworksData.ambientAudioUrl));
      } catch (assetError) {
        debugPrint('Asset playback failed, falling back to network: $assetError');
        await _ambientPlayer.play(UrlSource('https://kexart.com/prankaudio.mp3'));
      }
      await _ambientPlayer.setReleaseMode(ReleaseMode.loop);
      _isAmbientPlaying = true;
      notifyListeners();
    } catch (e) {
      debugPrint('Ambient audio play error: $e');
    }
  }

  // Stop / pause ambient background music
  Future<void> stopAmbientMusic() async {
    try {
      await _ambientPlayer.pause();
      _isAmbientPlaying = false;
      notifyListeners();
    } catch (e) {
      debugPrint('Ambient audio stop error: $e');
    }
  }

  // Toggle ambient background music
  Future<void> toggleAmbientMusic() async {
    try {
      if (_isAmbientPlaying) {
        await stopAmbientMusic();
      } else {
        await playAmbientMusic();
      }
    } catch (e) {
      debugPrint('Ambient audio toggle error: $e');
    }
  }

  // Play artwork audio commentary
  Future<void> playArtworkGuide(Artwork artwork) async {
    try {
      if (_currentArtwork?.id == artwork.id && isGuidePlaying) {
        await _guidePlayer.pause();
        return;
      }

      _currentArtwork = artwork;
      _currentPosition = Duration.zero;
      _totalDuration = Duration.zero;
      notifyListeners();

      // Lower ambient music when listening to artwork guide
      if (_isAmbientPlaying) {
        await _ambientPlayer.setVolume(0.1);
      }

      await _guidePlayer.stop();
      await _guidePlayer.play(_getSource(artwork.audioUrl));
    } catch (e) {
      debugPrint('Guide audio error: $e');
    }
  }

  Future<void> pauseGuide() async {
    await _guidePlayer.pause();
  }

  Future<void> resumeGuide() async {
    await _guidePlayer.resume();
  }

  Future<void> seekGuide(Duration position) async {
    await _guidePlayer.seek(position);
  }

  Future<void> stopGuide() async {
    await _guidePlayer.stop();
    _currentArtwork = null;
    if (_isAmbientPlaying) {
      await _ambientPlayer.setVolume(0.3);
    }
    notifyListeners();
  }

  @override
  void dispose() {
    _ambientPlayer.dispose();
    _guidePlayer.dispose();
    super.dispose();
  }
}
